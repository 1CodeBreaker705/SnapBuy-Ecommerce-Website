from models import checkoutModel
import bson
from config.db import user_collection,profile_collection,cart_collection,product_collection,orders_collection
from config.env import ENVConfig
from config.razorPayConfig import RazorPayClient 
from fastapi.responses import RedirectResponse
from random import randint
from datetime import datetime,timezone
from fastapi import HTTPException,status
import razorpay

async def makeCheckout(data,user_id):
    # user information
    data= data.model_dump()
    data['products'] = []
    data['total_payable_amount'] = 0
    data['user_id'] = user_id
    user = await user_collection.find_one({"_id":bson.ObjectId(user_id)})
    if not user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"User Not Found")
    
    data['email'] = user['email']
    profile = await profile_collection.find_one({"user_id":user_id})    
    
    if not profile:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Profile Not Created")
    
    data['name'] = profile['name']
    address =  next((item for item in profile['address'] if item['address_id'] == data['address_id']), None)
    if not address:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Address Not Found")
    
    del address['address_id']
    del data['address_id']
    data['address']=address
            
    async for cart_product in cart_collection.find({
       "user_id":user_id
    }):
        product = await product_collection.find_one({"_id": bson.ObjectId(cart_product['product_id'])})
        
        if not product:
           raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Not Found")
       
        data['total_payable_amount'] += cart_product['qty']*product['price']
        data['products'].append({
            '_id':str(product['_id']),
            'title':product['title'],
            'price':product['price'],
            'qty':cart_product['qty'],
            'image':product['images'][0]['image_url'],
            'slug':product['slug'],
            'merchant_id':str(product['merchant_detail']['_id']),
            "fulfillment_status": checkoutModel.FulfillmentStatusEnum.pending,
        })
    
    if not data['products']:
      raise HTTPException(status.HTTP_400_BAD_REQUEST,"Cart is empty")

    order_details = {
        "amount": data['total_payable_amount']*100,  # razorpay accepts money in paise (smallest unit)
        "currency": "INR",
        "receipt": f"SnapBuy{randint(1000,999999)}",
        "payment_capture": 1,
    }
    
    order=RazorPayClient.order.create(order_details)

    order_data = checkoutModel.AddOrder(
        amount=data['total_payable_amount'],
        order_receipt=order_details['receipt'],
        products=data['products'],
        user_id=user_id,
        razorpay_order_id=order['id']
    )
    
    await orders_collection.insert_one(data['address'] | order_data.model_dump())

    return order



async def checkoutCallbackService(data):

    try:
        
        RazorPayClient.utility.verify_payment_signature({
            'razorpay_order_id': data.razorpay_order_id,
            'razorpay_payment_id': data.razorpay_payment_id,
            'razorpay_signature': data.razorpay_signature
        })

        order_data = await orders_collection.find_one({
            "razorpay_order_id": data.razorpay_order_id
        })
        
        updated_products = []
        
        for product in order_data['products']:
            product['fulfillment_status'] = checkoutModel.FulfillmentStatusEnum.placed
            updated_products.append(product)

        await orders_collection.find_one_and_update({"razorpay_order_id":data.razorpay_order_id},{
            "$set":{
                'razorpay_payment_id': data.razorpay_payment_id,
                'razorpay_signature': data.razorpay_signature,
                "order_status": checkoutModel.OrdersEnum.confirmed,
                "products": updated_products,
                "updated_at":datetime.now(timezone.utc)
            }
        })

        await cart_collection.delete_many({
            "user_id": order_data['user_id']
        })
            
        return RedirectResponse(url=f"{ENVConfig.FRONTEND_URI}/checkout/success",status_code=302)
    
    except razorpay.errors.SignatureVerificationError:
        return RedirectResponse(url=f"{ENVConfig.FRONTEND_URI}/checkout/failed",status_code=302)
    

async def checkoutPaymentFailService(razorpay_order_id):
      order = await orders_collection.find_one({
        "razorpay_order_id": razorpay_order_id
      })

      if not order:
        raise HTTPException(404, "Order Not Found")
      print(order['order_status'])
      if order['order_status'] == checkoutModel.OrdersEnum.confirmed:
            return {
                "msg": "Order already confirmed"
            }

      updated_products = []

      for product in order['products']:
        product['fulfillment_status'] = checkoutModel.FulfillmentStatusEnum.cancelled
        updated_products.append(product)

      await orders_collection.update_one(
        {
            "razorpay_order_id": razorpay_order_id
        },
        {
            "$set": {
                "products": updated_products,
                "order_status": checkoutModel.OrdersEnum.cancelled,
                "updated_at": datetime.now(timezone.utc)
            }
        }
       )

      return {
        "msg": "Order Cancelled Successfully"
      }

    
    
