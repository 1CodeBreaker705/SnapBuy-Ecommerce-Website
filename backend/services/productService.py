import config.cloudinaryConfig
import cloudinary.uploader
from slugify import slugify
import uuid
from config.db import product_collection,profile_collection
import bson
from fastapi import HTTPException


async def allProductsService(user_id):
   all_products=[]
   async for product in product_collection.find({"merchant_detail._id":user_id}).sort("created_at", -1):
       all_products.append({
          'title': product['title'],
          "main_category":product['main_category'],
          "sub_category":product['sub_category'],
          'description': product['description'],
          'slug': product['slug'],
          'product_id': str(product['_id']),
          'image':product['images'][0]['image_url'],
          'created_at': product['created_at'],
       })
   return all_products    

async def addProductService(images,data,user_id):
  uploaded_images=[]
  for image in images:
    content = await image.read()
    result= cloudinary.uploader.upload(content)
    uploaded_images.append({
      "image_url":result['secure_url'],
      "public_id":result['public_id']
    })
  data=data.model_dump()  
  #slug field
  data['slug']=slugify(data['title']+"-"+ str(uuid.uuid4()))
  merchant_detail=await profile_collection.find_one({"user_id":user_id},{
    "name":1
  })
  merchant_detail = {
    "_id": user_id,
    "name": merchant_detail["name"]
  }
  product_data = {
        **data,
        "images": uploaded_images,
        "merchant_detail": merchant_detail
  }
  try:
    await product_collection.insert_one(product_data)
    return {
      "msg":"Product added"
    }
  except Exception:

    for image in uploaded_images:
        cloudinary.uploader.destroy(
            image["public_id"]
        )

    raise HTTPException(status_code=500,detail="Product creation failed")


async def updateProductService(id, images, data, user_id):

    product = await product_collection.find_one({
        "_id": bson.ObjectId(id),
        "merchant_detail._id": user_id
    })

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product Not Found"
        )

    data = data.model_dump()

    data["slug"] = slugify(
        data["title"] + "-" + str(uuid.uuid4())
    )

    updated_images = product["images"]

    # if merchant uploads new images
    if images:

        uploaded_images = []

        for image in images:

            content = await image.read()

            result = cloudinary.uploader.upload(content)

            uploaded_images.append({
                "image_url": result["secure_url"],
                "public_id": result["public_id"]
            })

        # delete old images
        for image in product["images"]:
            cloudinary.uploader.destroy(
                image["public_id"]
            )

        updated_images = uploaded_images

    updated_product = {
        **data,
        "images": updated_images
    }

    await product_collection.update_one(
        {
            "_id": bson.ObjectId(id),
            "merchant_detail._id": user_id
        },
        {
            "$set": updated_product
        }
    )

    return {
        "msg": "Product Updated"
    }


async def deleteProductService(id,user_id):
    product = await product_collection.find_one({"_id":bson.ObjectId(id),"merchant_detail._id": user_id})
    if not product:
        raise HTTPException(status_code=404,detail="Product Not Found")
    
    # check if product exists in any order history
    existing_order = await orders_collection.find_one({
        "products._id": str(product["_id"])
    })

    if existing_order:
        # keep first image for order history delete extra images
        extra_images = product['images'][1:]
        for image in extra_images:
            cloudinary.uploader.destroy(image['public_id'])

    else:
        # delete all images
        for image in product['images']:
            cloudinary.uploader.destroy(image['public_id'])

    # delete product from database
    await product_collection.find_one_and_delete({
    "_id": bson.ObjectId(id),
    "merchant_detail._id": user_id
    })

    return {
        "msg": "Product Deleted"
    }
