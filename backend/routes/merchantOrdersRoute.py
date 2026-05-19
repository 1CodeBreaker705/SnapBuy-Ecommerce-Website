from fastapi import APIRouter,Depends
from middleware.verifyAccountType import verify
from controllers import merchantOrdersController
from models.authModel import RolesEnum
from models.merchantOrdersModel import UpdateStatusModel

router = APIRouter(prefix="/api/v1/merchant-orders",tags=['merchant-orders'])

@router.get("/")
async def getAllOrdersView(user_id:str= Depends(verify(RolesEnum.merchant))):
    return await merchantOrdersController.getAllOrdersController(user_id)

@router.patch("/fulfilment_status")
async def updateProductStatusView(data: UpdateStatusModel,user_id:str = Depends(verify(RolesEnum.merchant))):
    return await merchantOrdersController.updateProductStatusController(data,user_id)