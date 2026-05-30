import os
import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, db

load_dotenv()

if not firebase_admin._apps:
    cred = credentials.Certificate(os.environ.get("FIREBASE_CREDENTIALS_PATH"))
    firebase_admin.initialize_app(cred, {
        "databaseURL": os.environ.get("FIREBASE_DATABASE_URL")
    })

def set_status(scan_id: str, status: str):
    #Reference to specific scan mode
    ref = db.reference(f'scans/{scan_id}')

    #Update the status field
    ref.update({
        "status": status
    })
    print(f"Successfully updated scan {scan_id} to status: {status}")
     
