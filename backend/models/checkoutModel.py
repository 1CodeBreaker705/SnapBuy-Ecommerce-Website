from pydantic import BaseModel,Field
from typing import List,Optional
from datetime import datetime,timezone
from enum import Enum

class MakeCheckout(BaseModel):
    phone_no:str 
    address_id:str

class FulfillmentStatusEnum(str,Enum):
    pending="pending"
    placed="placed"
    shipped="shipped"
    out_for_delivery='out_for_delivery'
    delivered="delivered"
    cancelled="cancelled" 

class OrdersEnum(str,Enum):
    pending="pending"
    confirmed='confirmed'
    cancelled="cancelled"
    completed="completed" 

class AddOrder(BaseModel): 
    user_id:str= Field(...)
    products:List[dict]= Field(...)
    order_receipt:str = Field(...)
    amount:int= Field(...)
    razorpay_order_id:str = Field(default='')
    razorpay_payment_id:str = Field(default='')
    razorpay_signature:str = Field(default='')
    order_status :Optional[OrdersEnum]= Field(default=OrdersEnum.pending)
    created_at:datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at:datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CallBackData(BaseModel):
    razorpay_order_id:str = Field(default='')
    razorpay_payment_id:str = Field(default='')
    razorpay_signature:str = Field(default='')


class FailedPaymentModel(BaseModel):
    razorpay_order_id:str
