import os
import requests
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
from web3 import Web3

load_dotenv()

router = APIRouter()

ALCHEMY_API_KEY = os.getenv("ALCHEMY_API_KEY")

CHAINS = {
    "ethereum": {
        "url": f"https://eth-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}",
        "symbol": "ETH",
    },
    "polygon": {
        "url": f"https://polygon-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}",
        "symbol": "MATIC",
    },
    "base": {
        "url": f"https://base-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}",
        "symbol": "ETH",
    },
}

@router.get("/api/balance/{address}")
def get_balance(address: str):
    if not ALCHEMY_API_KEY:
        raise HTTPException(status_code=500, detail="Alchemy API key missing")

    if not Web3.is_address(address):
        raise HTTPException(status_code=400, detail="Invalid EVM wallet address")

    balances = {}

    for chain, config in CHAINS.items():
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_getBalance",
            "params": [address, "latest"],
        }

        try:
            response = requests.post(config["url"], json=payload, timeout=8)
            data = response.json()

            if "error" in data:
                balances[chain] = {"error": data["error"].get("message", "RPC error")}
                continue

            balance_hex = data.get("result", "0x0")
            balance_wei = int(balance_hex, 16)
            balance_native = Web3.from_wei(balance_wei, "ether")

            balances[chain] = {
                "native_balance": str(balance_native),
                "symbol": config["symbol"],
            }

        except Exception as e:
            balances[chain] = {"error": str(e)}

    return {"address": address, "balances": balances}