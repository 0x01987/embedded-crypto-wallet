from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.balance import router as balance_router

app = FastAPI(title="VaultPay Wallet API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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