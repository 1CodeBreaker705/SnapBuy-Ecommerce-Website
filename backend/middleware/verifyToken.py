from fastapi import Request, HTTPException
import jwt
from config.env import ENVConfig

def verifyToken(req: Request):

    token = req.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Please login first")

    try:
        payload = jwt.decode(
            token,
            ENVConfig.JWT_AUTH_SECRET,
            algorithms=["HS256"]
        )
        
        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(status_code=401,detail="Invalid token payload")
        
        return user_id

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    except Exception:
        raise HTTPException(status_code=401,detail="Authentication failed")