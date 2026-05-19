from config.db import  orders_collection,product_collection,wishlist_collection,cart_collection
from models.checkoutModel import OrdersEnum

async def getUserDetails(user_id):
    #customer 
    no_of_customer_orders= await orders_collection.count_documents({"user_id":user_id,"order_status":{
                    "$in": [
              OrdersEnum.confirmed,
              OrdersEnum.completed,
              OrdersEnum.cancelled
            ]
         }  
    })
    no_of_wishlist= await wishlist_collection.count_documents({"user_id":user_id})
    no_of_products_in_cart= await cart_collection.count_documents({"user_id":user_id})
    
    #merchant
    no_of_products_of_merchant = await product_collection.count_documents({"merchant_detail._id":user_id})
    no_of_orders_for_merchant = await orders_collection.count_documents({
        "products.merchant_id": user_id,
        "order_status": {
            "$in": [
                OrdersEnum.confirmed,
                OrdersEnum.completed
            ]
        }
    })
    
    return {
        "customer_orders_length": no_of_customer_orders,
        "wishlist_length": no_of_wishlist,
        "cart_length": no_of_products_in_cart,
        "products_length": no_of_products_of_merchant,
        "merchant_orders_length": no_of_orders_for_merchant 
    }
    