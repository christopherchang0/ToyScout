import os
from dotenv import load_dotenv
from firebase_admin import credentials, db

def set_status(scan_id: str, status: str):
    #Reference to specific scan mode
    ref = db.reference(f'scans/{scan_id}')

    #Update the status field
    ref.update({
        "status": status
    })
    print(f"Successfully updated scan {scan_id} to status: {status}")
     
