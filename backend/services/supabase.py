import os
from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def upload_image(scan_id: str, file_bytes: bytes, content_type: str = "image/jpeg") -> str:
    ext = content_type.split("/")[-1]
    path = f"{scan_id}.{ext}"
    supabase.storage.from_("toy-images").upload(
        path, file_bytes, {"content-type": content_type, "upsert": "true"}
    )
    return supabase.storage.from_("toy-images").get_public_url(path)

def save_scan(scan_data: dict):
    """Saves a scan record to the 'scans' table."""
    response = (
        supabase.table("scans")
        .insert(scan_data)
        .execute()
    )
    return response.data

def get_scans(scan_id: int):
    """Retrieves a specific scan by its ID from the 'scans' table."""
    response = (
        supabase.table("scans")
        .select("*")
        .eq("id", scan_id)
        .execute()
    )
    return response.data[0] if response.data else None

def get_all_scans():
    response = (
        supabase.table("scans")
        .select("*")
        .execute()
    )
    return response.data
