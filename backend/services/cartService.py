from fastapi import HTTPException,status
from config.db import cart_collection,product_collection
from models import cartModel
import bson

async def addProductService(product_id,user_id):
    check_exist = await cart_collection.find_one({"product_id":product_id,"user_id":user_id})
    if check_exist:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Already Exist in Cart")

    product = cartModel.AddProduct(
        product_id=product_id,
        user_id=user_id
    )

    await cart_collection.insert_one(product.model_dump())
    return {
        "msg":"Product Added Into Cart Successfully"
    }

async def getProductService(product_id,user_id):
    check_product_exist = await cart_collection.find_one({"product_id":product_id,"user_id":user_id})
    if not check_product_exist:
        return {
            "qty":0
        }
    if 'qty' not in check_product_exist: 
        return {
            "qty":0
        }

    return {
        "qty":check_product_exist['qty']
    }

async def cartOperationService(product_id:str,operation:cartModel.CartOperations,user_id:str):
    
    check_product_exist = await cart_collection.find_one({"product_id":product_id,"user_id":user_id})
    if not check_product_exist:
       raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Not Found")

    match operation:
        
        case cartModel.CartOperations.increment:
            await cart_collection.find_one_and_update({"product_id":product_id,"user_id":user_id},{
                    "$inc": {
                        "qty": 1
                    }
            })
            return {
                "msg":"Product Quantity Increased"
            }
       
        case cartModel.CartOperations.decrement:
            if(check_product_exist['qty']==1):
                await cart_collection.find_one_and_delete({"product_id":product_id,"user_id":user_id})
                return {
                    "msg":"Product Removed From Cart"
                }
            await cart_collection.find_one_and_update({"product_id":product_id,"user_id":user_id},{
                "$inc": {
                    "qty": -1
                 }
            })

            return {
                "msg":"Product Quantity Decreased"
            }
        
        case cartModel.CartOperations.delete:
            await cart_collection.find_one_and_delete({"product_id":product_id,"user_id":user_id})
                
            return {
                "msg":"Product Removed From Cart"
            }
        case _:
            raise HTTPException(status.HTTP_400_BAD_REQUEST,"Operation Not Permitted")



async def getProductsService(user_id:str):
    all_products = []

    async for  cart_product in cart_collection.find({"user_id":user_id}):
        # products
        product = await product_collection.find_one({"_id":bson.ObjectId(cart_product['product_id'])})

        data = {
            "_id":cart_product['product_id'],
            "title":product['title'],
            "price":product['price'],
            "total_price":product['price']*cart_product['qty'],
            "main_category":product['main_category'],
            "sub_category":product['sub_category'],
            "qty":cart_product['qty'],
            "image": product['images'][0]['image_url']
        }
        all_products.append(data)

    total_price = sum(product['total_price'] for product in all_products )

    return {
        "products":all_products,
        "total":total_price
    }