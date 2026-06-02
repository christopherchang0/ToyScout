import os
import json
import tempfile
from fastapi import APIRouter, File, UploadFile
from services.vision import imagescanner
from services.supabase import save_scan
from services.firebase import set_status
import uuid

router = APIRouter()

@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    #Read the file content. waits until it is read
    scan_id = str(uuid.uuid4())
    set_status(scan_id, "Uploading")
    content = await file.read() #reads file into bytes

    #Scanning logic
    set_status(scan_id, "Analyzing")
    with tempfile.NamedTemporaryFile(delete=False, suffix = "png") as tmp:
        tmp.write(content) #writes bytes to an actual file on disk
        tmp_path = tmp.name #saves the file path
    #Ensures temp file gets deleted even if imagescanner has error
    try:
        result = imagescanner(tmp_path, "Identify this toy.")
        # Strip markdown code blocks if present
        result = result.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        toy_info = json.loads(result)
        # toy_info = {"name": "Test Toy",v"brand": "Test Brand", "year": "2020", "condition": "good", "estimated_value": "$10-$20", "description": "This is a test toy."}

    finally:
        os.remove(tmp_path)

    set_status(scan_id, "Done")
    save_scan({**toy_info, "id": scan_id})

    return toy_info

