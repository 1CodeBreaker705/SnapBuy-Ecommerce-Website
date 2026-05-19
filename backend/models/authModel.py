from pydantic import BaseModel,Field,EmailStr,field_validator
from datetime import datetime,timezone
from enum import Enum


class RolesEnum(str,Enum):
    customer='customer'
    merchant='merchant'


class User(BaseModel):
    name:str 
    phone_no:str = Field(min_length=10)
    email:EmailStr  
    password:str =Field(min_length=6)
    role:RolesEnum =Field(default=RolesEnum.customer)
    created_at:datetime =Field(default_factory=lambda:datetime.now(timezone.utc))
    updated_at:datetime =Field(default_factory=lambda:datetime.now(timezone.utc))
    
    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str):
        value = value.strip()
        if len(value) < 3:
            raise ValueError("Name must be at least 3 characters long")
        return value
    
    @field_validator("email")
    @classmethod
    def normalize_email(cls, value:EmailStr):
        return value.strip().lower()
    
    @field_validator("phone_no")
    @classmethod
    def validate_phone(cls, value: str):
      value = value.strip()
      if not value.isdigit():
          raise ValueError("Phone number must contain digits only")

      if len(value) != 10:
          raise ValueError("Phone number must be exactly 10 digits")

      return value
     

    model_config = {
        "extra": "forbid"
    }
    
class RegisterUser(User):
    pass    

class LoginUser(BaseModel):
    email:EmailStr
    password:str =Field(min_length=6)
    
    @field_validator("email")
    @classmethod
    def normalize_email(cls, value:EmailStr):
        return value.strip().lower()
    
    model_config = {
        "extra": "forbid"
    }
    
