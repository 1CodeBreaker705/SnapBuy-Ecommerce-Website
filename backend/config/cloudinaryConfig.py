import cloudinary
from config.env import ENVConfig


cloudinary.config(
  cloud_name = ENVConfig.CLOUDINARY_CLOUD_NAME, 
  api_key = ENVConfig.API_KEY_CLOUDINARY, 
  api_secret = ENVConfig.API_SECRET_CLOUDINARY
)

