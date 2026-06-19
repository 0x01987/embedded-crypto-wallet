from fastapi import FastAPI

app = FastAPI(title="VaultPay Wallet API")

@app.get("/")
def root():
    return {"status": "ok", "app": "VaultPay Wallet API"}

@app.get("/health")
def health():
    return {"healthy": True}

@app.get("/api/status")
def status():
    return {
        "status": "online",
        "version": "0.1.0"
    }