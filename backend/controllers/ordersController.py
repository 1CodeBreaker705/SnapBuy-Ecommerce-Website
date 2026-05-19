from services import ordersService

async def getAllOrdersController(user_id):
        return await ordersService.getAllOrdersService(user_id)
        
 
    