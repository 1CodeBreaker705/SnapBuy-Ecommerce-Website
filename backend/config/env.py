from dotenv import load_dotenv
import os

load_dotenv()

class ENVConfig:
   MONGO_URI=os.getenv("MONGO_URI","")
   MONGO_DB=os.getenv("MONGO_DB","")
   JWT_AUTH_SECRET=os.getenv("JWT_AUTH_SECRET","PlaceholderJWTSecreta8fK29xQpL5")
   API_KEY_CLOUDINARY=os.getenv("API_KEY_CLOUDINARY","")
   API_SECRET_CLOUDINARY=os.getenv("API_SECRET_CLOUDINARY","")
   CLOUDINARY_CLOUD_NAME=os.getenv("CLOUDINARY_CLOUD_NAME","")
   RAZORPAY_KEY_ID=os.getenv("RAZORPAY_KEY_ID","")
   RAZORPAY_KEY_SECRET=os.getenv("RAZORPAY_KEY_SECRET","")
   FRONTEND_URI=os.getenv("FRONTEND_URI","")
   
   
