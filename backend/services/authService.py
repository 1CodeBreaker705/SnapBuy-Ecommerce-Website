from config.db import user_collection,profile_collection
from fastapi.exceptions import HTTPException
import bcrypt
import jwt
from datetime import datetime,timedelta,timezone
from config.env import ENVConfig
import bson
from  models.profileModel import Profile

async def registerService(data):
  check_if_already_exists= await user_collection.find_one({"email":data.email})
  if check_if_already_exists:
     raise HTTPException(status_code=409,detail="User already exists")
  salt=bcrypt.gensalt()
  hash_string=bcrypt.hashpw(data.password.encode(),salt).decode()
  userData=data.model_dump()
  userData['password']=hash_string
  user_name=userData['name']
  user_phone_no=userData['phone_no']
  del userData['name']
  del userData['phone_no']
  try:
      result=await user_collection.insert_one(userData)
      #profile creation
      user_profile=Profile(user_id=str(result.inserted_id),name=user_name,phone_no=user_phone_no)
      await profile_collection.insert_one(user_profile.model_dump())
  except Exception:
      await user_collection.delete_one({"_id": result.inserted_id})
      raise HTTPException(status_code=500,detail="Registration failed")
   #token
  token=jwt.encode({
     "user_id":str(result.inserted_id),
     "exp":datetime.now(timezone.utc)+timedelta(days=10),
     "iat":datetime.now(timezone.utc)
  },ENVConfig.JWT_AUTH_SECRET,algorithm="HS256")
  
  return token

async def loginService(data):
  check_if_already_exists= await user_collection.find_one({"email":data.email})
  if not check_if_already_exists:
     raise HTTPException(status_code=401,detail="Invalid email or password") 
  password_match=bcrypt.checkpw(data.password.encode(),check_if_already_exists['password'].encode())
  if not password_match:
     raise HTTPException(status_code=401,detail='Invalid email or password')
  #token
  token=jwt.encode({
     "user_id":str(check_if_already_exists['_id']),
     "exp":datetime.now(timezone.utc)+timedelta(days=10),
     "iat":datetime.now(timezone.utc)
  },ENVConfig.JWT_AUTH_SECRET,algorithm="HS256")
  
  return token
     
async def profileService(user_id):
    fetch_user=await user_collection.find_one({"_id":bson.ObjectId(user_id)},{
       "password":0
    })
    if not fetch_user:
      raise HTTPException(status_code=404,detail="User not found")
    fetch_user['_id']=str(fetch_user['_id'])
    fetch_profile=await profile_collection.find_one({"user_id":user_id})
    if not fetch_profile:
       raise HTTPException(status_code=404,detail="Profile not found")
    del fetch_profile['_id']
    del fetch_profile['user_id']
   
    return fetch_user | fetch_profile


async def updateProfileService(data,user_id):
   await profile_collection.find_one_and_update({"user_id":user_id},{
      "$set":{
         "name":data.name,
         "phone_no": data.phone_no,
         "updated_at":datetime.now(timezone.utc)
      }
   })
   
   return {
      "msg": "Profile Updated"
   }

async def addNewAddressService(data,user_id):
   id=str(bson.ObjectId())
   data=data.model_dump()
   data["address_id"]=id
   await profile_collection.find_one_and_update({"user_id":user_id},{
      "$set":{
         "updated_at":datetime.now(timezone.utc)
      },
      "$push":{
            "address":data
      }
   })
  
   return {
      "msg": "Address Added"
   }


async def deleteAddressService(id,user_id):
    result = await profile_collection.update_one({"user_id":user_id},{
      "$set":{
         "updated_at":datetime.now(timezone.utc)
      },
      "$pull":{
            "address":{
               "address_id":id
            }
      }
   })
    
    if result.modified_count == 0:
      raise HTTPException(status_code=404,detail="Address not found")
  
    return {
      "msg": "Address Deleted"
   }
   