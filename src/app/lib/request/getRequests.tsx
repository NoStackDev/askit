export default async function getRequests() {
  const res = await fetch(`${process.env.API}/feeds`, { method: "OPTIONS" });

  if (!res.ok) throw new Error("Failed to get requests");

  return res.json();
}
