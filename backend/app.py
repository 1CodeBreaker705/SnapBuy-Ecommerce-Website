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
from contextlib import asynccontextmanager
from datetime import datetime, timezone, timedelta
from config.db import orders_collection

#fastapi instance

#this function automatically cleans orders from database on each server startup with order_status=pending older than 7 days (pending -> orders which couldnt be successfull nor cancelled)
#order created but didnt made any transaction

async def cleanup_pending_orders():         
    await orders_collection.delete_many({
        "order_status": "pending",
        "created_at": {
            "$lt": datetime.now(timezone.utc) - timedelta(days=7)
        }
    })

@asynccontextmanager
async def lifespan(app: FastAPI):

    await cleanup_pending_orders()

    yield

app=FastAPI(title='Ecommerce API',lifespan=lifespan)

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
