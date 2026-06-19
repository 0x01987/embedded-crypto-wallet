"use client";

import {
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";

export default function Home() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          VaultPay Wallet
        </h1>

        {!authenticated ? (
          <button
            onClick={login}
            className="bg-emerald-500 px-6 py-3 rounded-xl font-bold text-black"
          >
            Login / Create Wallet
          </button>
        ) : (
          <>
            <div className="bg-slate-900 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-2">
                Account
              </h2>

              <p>
                Email: {user?.email?.address ?? "Not Available"}
              </p>

              <p className="mt-2">
                Wallets: {wallets.length}
              </p>

              {wallets.map((wallet) => (
                <div
                  key={wallet.address}
                  className="mt-3 p-3 bg-slate-800 rounded"
                >
                  <p className="text-sm text-slate-400">
                    Address
                  </p>

                  <p className="break-all">
                    {wallet.address}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                className="bg-slate-700 px-5 py-3 rounded-xl"
              >
                Send
              </button>

              <button
                className="bg-slate-700 px-5 py-3 rounded-xl"
              >
                Receive
              </button>

              <button
                onClick={logout}
                className="bg-red-500 px-5 py-3 rounded-xl"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}