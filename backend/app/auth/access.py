from app.auth.firebase import db
#from firebase.js
def check_access(uid: str):
    doc = db.collection("users").document(uid).get()

    if not doc.exists:
        return False, "User not found"

    user = doc.to_dict()

    if not user.get("accessEnabled", False):
        return False, "Access revoked"

    # if user.get("role") not in ["admin", "demo"]:
    #     return False, "No permission"

    return True, user