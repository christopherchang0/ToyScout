from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import os
import json
import tempfile
from services.vision import imagescanner

app = FastAPI()

@app.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    #read the file content. waits until it is read
    content = await file.read()

    #scanning logic
    with tempfile.NamedTemporaryFile(delete=False, suffix = "png") as tmp:
        tmp.write(content) #writes bytes to an actual file on disk
        tmp_path = tmp.name #saves the file path
    #ensures temp file gets deleted even if imagescanner has error
    try:
        result = imagescanner(tmp_path, "Identify this toy.")
        toy_info = json.loads(result)
    finally:
        os.remove(tmp_path)

    return toy_info
