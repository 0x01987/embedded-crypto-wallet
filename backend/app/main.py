from fastapi import FastAPI

app = FastAPI(title="Embedded Crypto Wallet API")

@app.get("/")
def root():
    return {"status": "ok", "app": "Embedded Crypto Wallet API"}

@app.get("/health")
def health():
    return {"healthy": True}