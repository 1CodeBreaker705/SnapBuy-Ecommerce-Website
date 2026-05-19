from services import productService

async def addProductController(images,data,user_id):
    return await productService.addProductService(images,data,user_id)
    
async def allProductsController(user_id):
    return await productService.allProductsService(user_id)

async def updateProductController(id, images, data, user_id):
    return await productService.updateProductService(id,images,data,user_id)
    
async def deleteProductController(id,user_id):
        return  await productService.deleteProductService(id,user_id)
        

    
