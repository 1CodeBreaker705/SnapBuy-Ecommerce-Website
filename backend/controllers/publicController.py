from services import publicService

async def getAllProductsController(search,main_category,sub_category):
        return await publicService.getAllProductsService(search,main_category,sub_category)
  
async def getProductBySlugController(slug):
        return await publicService.getProductBySlugService(slug)
    
    




    