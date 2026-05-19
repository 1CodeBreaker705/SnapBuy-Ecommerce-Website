from fastapi import APIRouter,Response,Depends
from controllers import authController
from models import authModel,profileModel
from middleware.verifyToken import verifyToken


router=APIRouter(prefix="/api/v1/auth",tags=['Auth'])

#register
@router.post("/register")
async def registerView(data:authModel.RegisterUser,res:Response):
  return await authController.registerController(data,res)

#login
@router.post("/login")
async def loginView(data:authModel.LoginUser,res:Response):
  return await authController.loginController(data,res)

#profile
@router.get("/profile")
async def profileView(user_id: str = Depends(verifyToken)):
  return await authController.profileController(user_id)  

#logout
@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,     # True in deployment (HTTPS) / False in Local(Http) 
        samesite="none",  # none in deployement / lax in local 
        path="/"
    )
    return {"msg": "Logged out"}

#profile update
@router.patch("/update-profile")
async def updateProfileDetails(data:profileModel.UpdateProfile,user_id: str = Depends(verifyToken)):
    return await authController.updateProfileController(data,user_id)

#add new address
@router.post("/add-new-address")
async def addNewAddress(data:profileModel.Address,user_id: str = Depends(verifyToken)):
   return await authController.addNewAddressController(data,user_id)

#delete address
@router.delete("/delete-address/{id}")
async def deleteAddress(id:str,user_id: str = Depends(verifyToken)):
   return await authController.deleteAddressController(id,user_id)
