from pydantic import BaseModel,Field,model_validator
from config.categoriesConfig import MainCategory,CATEGORY_MAP
from datetime import datetime,timezone

class AddProduct(BaseModel):
   title:str=Field(min_length=1, max_length=120)
   main_category:MainCategory
   sub_category: str
   description:str = Field(max_length=3000)
   price:int = Field(gt=0)
   created_at:datetime =Field(default_factory=lambda:datetime.now(timezone.utc))

   @model_validator(mode="after")
   def validate_subcategory(self):
        self.sub_category = self.sub_category.upper()

        allowed_subcategories = CATEGORY_MAP.get(self.main_category,[])
        if self.sub_category not in allowed_subcategories:
            raise ValueError(
                "Invalid subcategory for selected category"
            )

        return self
   
