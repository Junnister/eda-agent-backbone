from fastapi import FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.auth.authorize import verify_token
#Get authorisation from Firebase
from app.auth.firebase import db
#from firebase.js
import pandas as pd
from io import BytesIO

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

@app.post("/upload_csv")
async def upload_csv(file: UploadFile = File(...)):
    if file is None:
        raise HTTPException(status_code=400, detail="No file uploaded")
    try:
        file_contents = await file.read()  
        file_bytes = BytesIO(file_contents) # Convert the file contents to a BytesIO object for storing memory      
        df = pd.read_csv(file_bytes)
        # Process the DataFrame as needed
        # Check to_dict(orient="records")
        return {"columns": df.columns.tolist(), "head": df.head(10).to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
