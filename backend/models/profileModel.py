from pydantic import BaseModel,Field,field_validator
from datetime import datetime,timezone
from typing import List

class Address(BaseModel):
   country:str
   state:str
   district:str
   landmark:str
   house_no:str
   pin_code:str
   
   @field_validator("pin_code")
   @classmethod
   def validate_pin(cls, value):
      if not value.isdigit() or len(value) != 6:
          raise ValueError("Invalid pin code")
      return value
   
   model_config = {
    "extra": "forbid"
   }
   

class Profile(BaseModel):
   user_id:str
   name:str
   phone_no: str = Field(min_length=10)
   address:List[Address] = Field(default_factory=list)
   created_at:datetime =Field(default_factory=lambda:datetime.now(timezone.utc))
   updated_at:datetime =Field(default_factory=lambda:datetime.now(timezone.utc))

   @field_validator("name")
   @classmethod
   def validate_name(cls, value: str):
        value = value.strip()
        if len(value) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return value
   
   @field_validator("phone_no")
   @classmethod
   def validate_phone(cls, value: str):
      value = value.strip()
      if not value.isdigit():
         raise ValueError(
            "Phone number must contain digits only"
         )
      if len(value) != 10:
         raise ValueError(
            "Phone number must be exactly 10 digits"
         )
      return value

   model_config = {
        "extra": "forbid"
    }
   
class UpdateProfile(BaseModel):
    name:str
    phone_no: str = Field(min_length=10)
    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str):
        value = value.strip()
        if len(value) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return value
    
    @field_validator("phone_no")
    @classmethod
    def validate_phone(cls, value: str):
        value = value.strip()
        if not value.isdigit():
            raise ValueError(
               "Phone number must contain digits only"
            )
        if len(value) != 10:
            raise ValueError(
               "Phone number must be exactly 10 digits"
            )
        return value
    
    model_config = {
        "extra": "forbid"
    }