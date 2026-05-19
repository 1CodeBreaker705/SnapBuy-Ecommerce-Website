from config.db import orders_collection
import bson
from fastapi import HTTPException
from datetime import datetime,timezone
from models.checkoutModel import OrdersEnum,FulfillmentStatusEnum

async def getAllOrdersService(user_id):

    all_orders = []

    async for order in orders_collection.find({
        "products.merchant_id": user_id,
        "order_status": {
            "$in": [OrdersEnum.confirmed, OrdersEnum.completed]
        }
    }).sort("created_at", -1):

        merchant_products = []

        for product in order['products']:
            if product['merchant_id'] == user_id:
                merchant_products.append({
                    "_id": product['_id'],
                    "title": product['title'],
                    "image": product['image'],
                    "qty": product['qty'],
                    "slug": product['slug'],
                    "price":product['price'],
                    "fulfillment_status": product['fulfillment_status']
                })

        all_orders.append({
            "order_id": str(order['_id']),
            "order_receipt": order['order_receipt'],
            "order_status": order['order_status'],
            "products": merchant_products,
            "created_at": order['created_at']
        })

    return all_orders


async def updateProductStatusService(data, user_id):

    order = await orders_collection.find_one({
        "_id": bson.ObjectId(data.order_id)
    })

    if not order:
        raise HTTPException(404, "Order Not Found")
    
    if order['order_status'] in [OrdersEnum.cancelled, OrdersEnum.completed]:
     raise HTTPException(400,"Order can no longer be updated")

    updated_products = []

    updated = False

    for product in order['products']:

        if (product['_id'] == data.product_id and product['merchant_id'] == user_id):
            product['fulfillment_status'] = (
                data.fulfillment_status
            )
            updated = True

        updated_products.append(product)

    if not updated:
        raise HTTPException(status_code=403,detail="You cannot update this product")   

    statuses = [
      p['fulfillment_status']
      for p in updated_products
    ]

    overall_status = OrdersEnum.confirmed

    if any(s == FulfillmentStatusEnum.cancelled for s in statuses):

        overall_status = OrdersEnum.cancelled

    elif all(s == FulfillmentStatusEnum.delivered for s in statuses):

        overall_status = OrdersEnum.completed

    await orders_collection.update_one(
    {
        "_id": bson.ObjectId(data.order_id)
    },
    {
        "$set": {
            "products": updated_products,
            "order_status": overall_status,
            "updated_at": datetime.now(timezone.utc)
        }
    }
   ) 
    return {
     "msg": "Fulfillment Status Updated"
    }   
