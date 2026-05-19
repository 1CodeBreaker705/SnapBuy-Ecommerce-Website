from services import merchantOrdersService

async def getAllOrdersController(user_id):
        return await merchantOrdersService.getAllOrdersService(user_id)
        
async def updateProductStatusController(data,user_id):
        return await merchantOrdersService.updateProductStatusService(data,user_id)
    