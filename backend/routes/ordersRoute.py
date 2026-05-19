from fastapi import APIRouter,Depends
from middleware.verifyAccountType import verify
from controllers import ordersController
from models.authModel import RolesEnum

router = APIRouter(prefix="/api/v1/orders",tags=['orders'])

@router.get("/")
async def getAllOrdersView(user_id:str= Depends(verify(RolesEnum.customer))):
    return await ordersController.getAllOrdersController(user_id)