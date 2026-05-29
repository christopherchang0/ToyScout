import os
from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url: str = os.environ.get("SUPABASE_KEY")
key: str = os.environ.get("SUPABASE_URL")
supabase: Client = create_client(url, key)

def save_scan():
    return 

def get_scans():
    return 