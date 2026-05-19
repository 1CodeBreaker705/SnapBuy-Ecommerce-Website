from fastapi import APIRouter,UploadFile,File,Depends,Form,HTTPException
from controllers import productController
from typing import List,Annotated
from models import productModel
from pydantic import ValidationError
from middleware.verifyAccountType import verify
from models.authModel import RolesEnum

router=APIRouter(prefix='/api/v1/product',tags=['Merchant Products'])

@router.get("/all-products")
async def allProductsView(user_id:str = Depends(verify(RolesEnum.merchant))):
  return await productController.allProductsController(user_id)  

@router.post("/add-product")
async def addProductView(images:Annotated[List[UploadFile],File(...)],title:str=Form(...),main_category:str=Form(...),sub_category:str=Form(...),description:str=Form(...),price:int=Form(...),user_id:str = Depends(verify(RolesEnum.merchant))):
  try:
    data = productModel.AddProduct.model_validate({
      "title": title,
      "description": description,
      "main_category": main_category,
      "sub_category": sub_category,
      "price": price,
    })                        
    return await productController.addProductController(images,data,user_id)
  except ValidationError as e :
     raise HTTPException(status_code=400,detail=e.errors())

@router.patch("/update-product/{id}")
async def updateProductView(id: str,images: Annotated[List[UploadFile] | None, File()] = None,title: str = Form(...),main_category: str = Form(...),sub_category: str = Form(...),description: str = Form(...),price: int = Form(...),user_id: str = Depends(verify(RolesEnum.merchant))):

    data = productModel.AddProduct.model_validate({
        "title": title,
        "description": description,
        "main_category": main_category,
        "sub_category": sub_category,
        "price": price,
    })

    return await productController.updateProductController(id,images,data,user_id)
  
@router.delete("/delete/{id}")
async def deleteProductView(id:str,user_id:str= Depends(verify(RolesEnum.merchant))):
    return await productController.deleteProductController(id,user_id)

