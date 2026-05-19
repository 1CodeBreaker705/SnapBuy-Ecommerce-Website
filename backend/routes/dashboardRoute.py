from fastapi import APIRouter,Depends
from controllers import dashboardController
from middleware.verifyToken import verifyToken

router = APIRouter(prefix="/api/v1/dashboard",tags=['dashboard'])

@router.get("/")
async def dashboardView(user_id:str=Depends(verifyToken)):
    return await dashboardController.dashboardController(user_id)