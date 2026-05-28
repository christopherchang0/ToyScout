from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/health", status_code=200)
def label_liveness_check():
    return {"status": "healthy"}