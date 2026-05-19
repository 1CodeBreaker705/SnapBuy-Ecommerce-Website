from services import authService

async def registerController(data,response):
   token= await authService.registerService(data)
   response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,     # true in deployment (HTTPS) / false in local (http)
        samesite="none",  # none in deployment / lax in local 
        max_age=864000,
        path="/"
    )
   return {
     "msg":"Register Success"
   }

async def loginController(data,response):
   token= await authService.loginService(data)
   response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,     # true in deployment (HTTPS) / false in local (http)
        samesite="none",  # none in deployment / lax in local 
        max_age=864000,
        path="/"
    )
   return {
     "msg":"Login Success"
   }
   
async def profileController(user_id):
   return await authService.profileService(user_id)
   

async def updateProfileController(data,user_id):
   return await authService.updateProfileService(data,user_id)
   

async def addNewAddressController(data,user_id):
   return await authService.addNewAddressService(data,user_id)
   
   
async def deleteAddressController(id,user_id):
   return await authService.deleteAddressService(id,user_id)
  

   
