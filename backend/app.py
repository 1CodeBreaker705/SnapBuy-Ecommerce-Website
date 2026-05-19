from fastapi import FastAPI
from routes.authRoute import router as AuthRouter
from routes.productRoute import router as ProductRouter
from routes.publicRoute import router as PublicRouter
from routes.wishlistRoute import router as WishListRouter
from routes.cartRoute import router as CartRouter
from routes.checkoutRoute import router as CheckoutRouter
from routes.ordersRoute import router as OrdersRouter
from routes.dashboardRoute import router as DashboardRouter
from routes.merchantOrdersRoute import router as MerchantOrdersRouter
from fastapi.middleware.cors import CORSMiddleware
from config.env import ENVConfig
#fastapi instance

app=FastAPI(title='Ecommerce API')

#for CORS Error
app.add_middleware(CORSMiddleware,allow_headers=['*'],
  allow_methods=['*'],
  allow_origins=[ENVConfig.FRONTEND_URI],
  allow_credentials=True
)

#routes
app.include_router(AuthRouter)
app.include_router(ProductRouter)
app.include_router(PublicRouter)
app.include_router(WishListRouter)
app.include_router(CartRouter)
app.include_router(CheckoutRouter)
app.include_router(OrdersRouter)
app.include_router(DashboardRouter)
app.include_router(MerchantOrdersRouter)


@app.get("/",tags=["ServerHealth"])
def healthRoute():
  return{
     "msg":"Server is Working Correctly"
  }