export default async function getCategories() {
  const res = await fetch(`${process.env.API}/categories`, {
    method: "OPTIONS",
  });

  if (!res.ok) throw new Error("Failed to get requests");

  return res.json();
}
