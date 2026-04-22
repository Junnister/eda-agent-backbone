from firebase_admin import auth
from fastapi import HTTPException

def verify_token(authorization: str):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")

    token = authorization.replace("Bearer ", "")
    return auth.verify_id_token(token)