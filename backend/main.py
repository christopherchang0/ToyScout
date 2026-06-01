from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.scan import router as scan_router
from services.supabase import get_all_scans


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/scans")
def fetch_scans():
    return get_all_scans()

@app.get("/health", status_code=200)
def label_liveness_check():
    return {"status": "healthy"}