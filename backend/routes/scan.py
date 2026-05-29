from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel

app = FastAPI()

@app.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    #read the file content. waits until it is read
    content = await file.read()

    #scanning logic
    #result = scanner_function(content)

    return {"file name": file.filename, "status": "successfully scanned"}
