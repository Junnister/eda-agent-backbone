import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
import json
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)
#print("TEST_VAR =", os.getenv("FIREBASE_SERVICE_ACCOUNT"))
service_account = json.loads(os.environ["FIREBASE_SERVICE_ACCOUNT"])
#print("Project name:", os.environ.get("FIREBASE_PROJECT_ID"))

cred = credentials.Certificate(service_account)
firebase_admin.initialize_app(cred)

# Initialize Firestore DB
db = firestore.client()

