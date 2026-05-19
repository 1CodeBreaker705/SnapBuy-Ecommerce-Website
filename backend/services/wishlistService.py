from fastapi import HTTPException,status
from config.db import wishlist_collection,product_collection
import bson
from models import wishlistModel

async def toggleProductService(product_id,user_id):
    check_product_exist = await wishlist_collection.find_one({"product_id": product_id,"user_id": user_id})

    if check_product_exist :
         await wishlist_collection.find_one_and_delete({"product_id": product_id,"user_id": user_id}) 
         return {
              "msg":"Product Removed From WishList"
         }

    product = wishlistModel.AddProduct(product_id=product_id,user_id=user_id)
    await wishlist_collection.insert_one(product.model_dump())
    return {
        "msg":"Product Added into WishList"
    }

async def getProductService(product_id,user_id):
    check_product_exist = await wishlist_collection.find_one({"product_id": product_id,"user_id": user_id})

    if not check_product_exist:
        return {
        "exist":False
    }
    return {
        "exist":True
    }


async def getProductsService(user_id):
    products =[]
    async for product in wishlist_collection.find({"user_id":user_id}).sort("created_at", -1):
        data = await product_collection.find_one({"_id":bson.ObjectId(product['product_id'])})

        products.append({
            "title": data['title'],
            "main_category":data['main_category'],
            "sub_category":data['sub_category'],
            "slug": data['slug'],
            "_id": str(data['_id']),
            "created_at":data['created_at'],
            "image":data['images'][0]['image_url'],
        })
    
    return products


async def deleteProductService(product_id,user_id):
    check_exist = await wishlist_collection.find_one_and_delete({"product_id": product_id,"user_id": user_id})
    if not check_exist:
        raise HTTPException(status.HTTP_404_NOT_FOUND,"Product Not Found")
    return {
        "msg":"Product Removed From WishList"
    }
