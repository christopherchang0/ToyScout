import os
import json
import tempfile
from fastapi import APIRouter, File, UploadFile
from services.vision import imagescanner
from services.supabase import save_scan, upload_image
from services.firebase import set_status
import uuid

router = APIRouter()

@router.post("/scan")
async def scan_file(files: list[UploadFile] = File(...)):
    #Read the file content. waits until it is read
    scan_id = str(uuid.uuid4()) 
    set_status(scan_id, "Uploading")

    tmp_paths = []
    file_bytes_list = []
    content_types = []
    for file in files:
        content = await file.read()
        file_bytes_list.append(content)
        content_types.append(file.content_type or "image/jpeg")
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
            tmp.write(content)
            tmp_paths.append(tmp.name)

    set_status(scan_id, "Analyzing")

    try:
        result = imagescanner(tmp_paths, "Identify this specific toy figure. Look carefully for any text, numbers, or labels on the packaging or figure itself. Note the exact product line, series number, wave, and year printed on the toy or box. Be as specific as possible about which exact version or release this is.")
        result = result.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        toy_info = json.loads(result)
    finally:
        for path in tmp_paths:
            os.remove(path)

    image_url = upload_image(scan_id, file_bytes_list[0], content_types[0])

    set_status(scan_id, "Done")
    save_scan({**toy_info, "id": scan_id, "image_url": image_url})

    return {**toy_info, "image_url": image_url}

