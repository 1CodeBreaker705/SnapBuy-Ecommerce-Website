from middleware.verifyToken import verifyToken
from models.authModel import RolesEnum
from fastapi import Depends,HTTPException
from config.db import user_collection
import bson

def verify(accountType:RolesEnum):
  async def wrapper(user_id: str = Depends(verifyToken)):
    user=await user_collection.find_one({'_id':bson.ObjectId(user_id)})
    if not user:
      raise HTTPException(status_code=401,detail='User Not Found')
    if user['role'] != accountType.value:
      raise HTTPException(status_code=403,detail=f'User is not {accountType.value}')
    return user_id
  return wrapper
