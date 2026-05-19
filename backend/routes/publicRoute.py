from fastapi import APIRouter
from controllers import publicController
from typing import Optional

router = APIRouter(prefix="/api/v1",tags=['Public'])

@router.get("/products")
async def getAllProductsView(search: Optional[str] = None,main_category: Optional[str] = None,sub_category: Optional[str] = None):
    return await publicController.getAllProductsController(search,main_category,sub_category)


@router.get("/product/{slug}")
async def getProductView(slug:str):
    return await publicController.getProductBySlugController(slug)