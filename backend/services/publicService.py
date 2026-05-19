from config.db import product_collection
from fastapi import status, HTTPException

async def getAllProductsService(search,main_category,sub_category):
    products = []

    query = {}

    if search:
        query["title"] = {
            "$regex": search,
            "$options": "i"
        }

    if main_category:
        query["main_category"] = main_category

    if sub_category:
        query["sub_category"] = sub_category

    async for product in product_collection.find(query,{
        "_id":0,
        "description":0,
        "merchant_detail":0,
        "updated_at":0,
        "created_at":0
    }):
        product['image'] = product['images'][0]['image_url']
        del product['images']

        products.append(product)

    return products

async def getProductBySlugService(slug):
    slugcleaned = slug.lower().strip()
    product =  await product_collection.find_one({
        "slug":slugcleaned
    },{
      
        "updated_at":0,

    })
    if not product:
        raise HTTPException(status.HTTP_404_NOT_FOUND,"Product Not Found")
   
    product['_id'] = str(product['_id'])
    if 'merchant_detail' in product:
     del product['merchant_detail']['_id']

    return product


