from pydantic import BaseModel
from models.checkoutModel import FulfillmentStatusEnum


class UpdateStatusModel(BaseModel):
    order_id:str
    product_id:str
    fulfillment_status: FulfillmentStatusEnum