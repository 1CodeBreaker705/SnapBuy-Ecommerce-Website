from fastapi import APIRouter,Depends
from controllers import cartController
from middleware.verifyAccountType import verify
from models import cartModel
from models.authModel import RolesEnum
router = APIRouter(prefix="/api/v1/cart",tags=['cart'])


@router.get("/get")
async def getProductsView(user_id:str=Depends(verify(RolesEnum.customer))):
    return await cartController.getProductsController(user_id)


@router.get("/get/{product_id}")
async def getProductView(product_id:str,user_id:str=Depends(verify(RolesEnum.customer))):
    return await cartController.getProductController(product_id,user_id)


@router.put("/product/{product_id}/{operation}")
async def cartOperationView(product_id:str, operation:cartModel.CartOperations ,user_id:str=Depends(verify(RolesEnum.customer))):
    return await cartController.cartOperationController(product_id,operation,user_id)


@router.post("/add")
async def addProductView(data:cartModel.AddNewProduct,user_id:str=Depends(verify(RolesEnum.customer))):
    return await cartController.addProductController(data.product_id,user_id)