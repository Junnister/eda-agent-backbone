from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.auth.authorize import verify_token
#Get authorisation from Firebase
from app.auth.firebase import db
#from firebase.js

#Get user info from Firestore for checking access
def check_access(uid: str):
    doc = db.collection("users").document(uid).get()

    if not doc.exists:
        return False, "User not found"

    user = doc.to_dict()

    return True, user

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://192.168.1.2:3000","https://eda-agent-backbone.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Get
@app.get("/")
async def root():
    return {"message": "FastAPI is running"}

@app.get("/protected")
def protected_route(authorization: str = Header(None)):
    decoded = verify_token(authorization)
    uid = decoded["uid"] #it uses the UID to check for authorisation
    allowed, user = check_access(uid)

    if not allowed:
        raise HTTPException(status_code=403, detail=user)

    #Output for user data 
    return {
        "message": "Access granted",
        "role": user["role"],
        "email": user["email"],
        "accessEnabled": user["accessEnabled"]
    }



 
