from services import dashboardService

async def dashboardController(user_id):
    return await dashboardService.getUserDetails(user_id)
    
 
    