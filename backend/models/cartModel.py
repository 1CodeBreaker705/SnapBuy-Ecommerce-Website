from pydantic import BaseModel ,Field
from datetime import datetime,timezone

from enum import Enum

class AddNewProduct(BaseModel):
    product_id:str 

class AddProduct(BaseModel):
    product_id:str= Field(...)
    user_id:str = Field(...)
    qty:int = Field(default=1) 
    created_at : datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at : datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CartOperations (str,Enum):
    increment = "increment"
    decrement = "decrement"
    delete = "delete"