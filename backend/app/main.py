from fastapi import FastAPI
from app.routes.balance import router as balance_router

app = FastAPI(title="VaultPay Wallet API")

app.include_router(balance_router)

@app.get("/")
def root():
    return {"status": "ok", "app": "VaultPay Wallet API"}

@app.get("/health")
def health():
    return {"healthy": True}

@app.get("/api/status")
def status():
    return {"status": "online", "version": "0.1.0"}