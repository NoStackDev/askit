export default async function searchRequests(
  searchText: string,
  setCurrentFeedsUrl?: React.Dispatch<React.SetStateAction<URL | null>>
) {
  let url = new URL(`${process.env.API}/search`);
  url.searchParams.append("str", searchText);

  if (setCurrentFeedsUrl)
    setCurrentFeedsUrl(new URL(`${process.env.API}/feeds`));

  const res = await fetch(url, {
    method: "OPTIONS",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
}
