export default async function getRequests() {
  const res = await fetch(`${process.env.API}/feeds`, {
    method: "OPTIONS",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
}
