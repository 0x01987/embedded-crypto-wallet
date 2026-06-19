export default function Home() {
  const networks = ["Polygon", "Base", "Ethereum", "Solana", "Bitcoin", "XRP"];

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm text-emerald-400 font-semibold">Secure Embedded Wallet</p>
          <h1 className="text-4xl font-bold mt-2">VaultPay Wallet</h1>
          <p className="text-slate-400 mt-3">
            Simple, fast, multi-chain crypto wallet with secure embedded wallet support.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
            <p className="text-slate-400 text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold mt-2">$0.00</h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
            <p className="text-slate-400 text-sm">Security</p>
            <h2 className="text-xl font-semibold mt-2">Protected</h2>
            <p className="text-sm text-slate-500 mt-1">Passkey + MPC ready</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800">
            <p className="text-slate-400 text-sm">Status</p>
            <h2 className="text-xl font-semibold mt-2 text-emerald-400">Online</h2>
            <p className="text-sm text-slate-500 mt-1">Backend ready</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <button className="rounded-xl bg-emerald-500 text-slate-950 font-bold py-4 hover:bg-emerald-400">
            Create Wallet
          </button>
          <button className="rounded-xl bg-slate-800 font-bold py-4 hover:bg-slate-700">
            Send
          </button>
          <button className="rounded-xl bg-slate-800 font-bold py-4 hover:bg-slate-700">
            Receive
          </button>
          <button className="rounded-xl bg-slate-800 font-bold py-4 hover:bg-slate-700">
            Swap
          </button>
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
                <p className="text-sm text-slate-500 mt-1">Send / Receive ready</p>
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
      </section>
    </main>
  );
}