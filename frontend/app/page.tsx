"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function Home() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const [copied, setCopied] = useState(false);

  const networks = [
    "Ethereum",
    "Polygon",
    "Base",
    "Solana",
    "Bitcoin",
    "XRP",
  ];

  const primaryWallet = wallets[0];
  const walletAddress = primaryWallet?.address;

  const copyAddress = async () => {
    if (!walletAddress) return;

    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading wallet...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm text-emerald-400 font-semibold">
            Secure Embedded Multi-Chain Wallet
          </p>
          <h1 className="text-4xl font-bold mt-2">VaultPay Wallet</h1>
          <p className="text-slate-400 mt-3">
            Simple, fast crypto wallet with embedded wallet login, QR receive,
            and multi-chain support roadmap.
          </p>
        </div>

        {!authenticated ? (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">
            <h2 className="text-2xl font-bold mb-3">Create your wallet</h2>
            <p className="text-slate-400 mb-6">
              Sign in with email or Google. Your wallet will be created
              automatically.
            </p>

            <button
              onClick={login}
              className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-400"
            >
              Login / Create Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
                <p className="text-slate-400 text-sm">Total Balance</p>
                <h2 className="text-3xl font-bold mt-2">$0.00</h2>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
                <p className="text-slate-400 text-sm">Security</p>
                <h2 className="text-xl font-semibold mt-2">Protected</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Privy embedded wallet ready
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
                <p className="text-slate-400 text-sm">Account</p>
                <h2 className="text-xl font-semibold mt-2">
                  {user?.email?.address ?? "Logged In"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Wallets: {wallets.length}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <h2 className="text-xl font-bold mb-4">Receive Crypto</h2>

                {walletAddress ? (
                  <>
                    <div className="rounded-xl bg-white p-4 w-fit mb-4">
                      <QRCode value={walletAddress} size={180} />
                    </div>

                    <p className="text-sm text-slate-400 mb-2">
                      Wallet Address
                    </p>

                    <p className="break-all rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm">
                      {walletAddress}
                    </p>

                    <button
                      onClick={copyAddress}
                      className="mt-4 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-400"
                    >
                      {copied ? "Copied!" : "Copy Address"}
                    </button>
                  </>
                ) : (
                  <p className="text-slate-400">Creating wallet...</p>
                )}
              </div>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

                <div className="grid gap-3">
                  <button className="rounded-xl bg-slate-800 font-bold py-4 hover:bg-slate-700">
                    Send
                  </button>

                  <button className="rounded-xl bg-slate-800 font-bold py-4 hover:bg-slate-700">
                    Receive
                  </button>

                  <button className="rounded-xl bg-slate-800 font-bold py-4 hover:bg-slate-700">
                    Swap
                  </button>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-red-500 font-bold py-4 hover:bg-red-400"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-8">
              <h2 className="text-xl font-bold mb-4">Supported Networks</h2>

              <div className="grid gap-3 md:grid-cols-3">
                {networks.map((network) => (
                  <div
                    key={network}
                    className="rounded-xl bg-slate-950 border border-slate-800 p-4"
                  >
                    <p className="font-semibold">{network}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Send / Receive planned
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-slate-500">
                No transactions yet.
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}