from fastapi import APIRouter,Depends,Form
from controllers import checkoutController
from models import checkoutModel
from models.authModel import RolesEnum
from middleware.verifyAccountType import verify
router = APIRouter(prefix="/api/v1",tags=['checkout'])


@router.post("/checkout")
async def makeCheckoutView(data:checkoutModel.MakeCheckout,user_id:str =Depends(verify(RolesEnum.customer)) ):
    return await checkoutController.makeCheckoutController(data,user_id) 


@router.post("/checkout/callback")
async def checkoutCallbackView(razorpay_order_id:str=Form(...),razorpay_payment_id:str=Form(...),razorpay_signature:str=Form(...),):
    checkout = checkoutModel.CallBackData(razorpay_order_id=razorpay_order_id,razorpay_signature=razorpay_signature,razorpay_payment_id=razorpay_payment_id)
    return await checkoutController.checkoutCallbackController(checkout) 

@router.patch("/checkout/payment-failed")
async def checkoutPaymentFailView(data: checkoutModel.FailedPaymentModel):
    return await checkoutController.checkoutPaymentFailController(data.razorpay_order_id)