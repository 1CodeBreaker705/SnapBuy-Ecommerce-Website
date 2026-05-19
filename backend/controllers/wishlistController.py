from services import wishlistService

async def toggleProductController(product_id,user_id):
        return await wishlistService.toggleProductService(product_id,user_id)
    
    
async def getProductController(product_id,user_id):
        return await wishlistService.getProductService(product_id,user_id)
   
    
async def getProductsController(user_id):
        return await wishlistService.getProductsService(user_id)
    

async def deleteProductController(product_id,user_id):
        return await wishlistService.deleteProductService(product_id,user_id)
   


