export async function getBalances(address: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/balance/${address}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch balances");
  }

  return response.json();
}