from services import cartService

async def addProductController(product_id,user_id):
        return await cartService.addProductService(product_id,user_id)
       

async def getProductsController(user_id):
        return await cartService.getProductsService(user_id)
        
       
async def getProductController(product_id,user_id):
        return await cartService.getProductService(product_id,user_id)
        
    
async def cartOperationController(product_id,operation,user_id):
        return await cartService.cartOperationService(product_id,operation,user_id)
        

    

    

