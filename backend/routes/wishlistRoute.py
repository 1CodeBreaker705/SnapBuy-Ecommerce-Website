from fastapi import APIRouter,Depends
from controllers import wishlistController
from middleware.verifyAccountType import verify
from models.authModel import RolesEnum
from models import wishlistModel

router  = APIRouter(prefix="/api/v1/wishlist",tags=["WishList"])

@router.post("/toggle")
async def toggleProductView(data:wishlistModel.ToggleProduct,user_id:str =Depends(verify(RolesEnum.customer)) ):
    return await wishlistController.toggleProductController(data.product_id,user_id)

@router.get("/get")
async def getProductsView(user_id:str =Depends(verify(RolesEnum.customer)) ):
    return await wishlistController.getProductsController(user_id)


@router.get("/get/{product_id}")
async def toggleProductView(product_id:str,user_id:str =Depends(verify(RolesEnum.customer)) ):
    return await wishlistController.getProductController(product_id,user_id)


@router.delete("/delete/{product_id}")
async def deleteProductView(product_id:str,user_id:str =Depends(verify(RolesEnum.customer)) ):
    return await wishlistController.deleteProductController(product_id,user_id)