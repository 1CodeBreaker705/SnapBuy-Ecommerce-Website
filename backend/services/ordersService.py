from config.db import  orders_collection
async def getAllOrdersService(user_id):

    all_orders = []

    async for order in orders_collection.find({"user_id":user_id}).sort("created_at", -1):
        order_detail = {
            "id":order['order_receipt'],
            "success": True if order['razorpay_payment_id'] else False,
            "amount":order['amount'],
            "created_at":order['created_at'],
            "status":order['order_status'],
            "products":[]
        }

        for product in order['products'] :
            item_doc={
                "title":product['title'],
                "image":product['image'],
                "qty":product['qty'],
                "slug":product['slug'],
                "price":product['price'],
                "fulfillment_status": product['fulfillment_status']
            }
            order_detail['products'].append(item_doc)
        
        all_orders.append(order_detail)
        
    return all_orders