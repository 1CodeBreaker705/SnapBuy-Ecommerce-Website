from services import checkoutService

async def makeCheckoutController(data,user_id):
        return await checkoutService.makeCheckout(data,user_id)
        
  
async def checkoutCallbackController(data):
        return await checkoutService.checkoutCallbackService(data)

async def checkoutPaymentFailController(razorpay_order_id):
        return await checkoutService.checkoutPaymentFailService(razorpay_order_id)
        
        
  
    


    