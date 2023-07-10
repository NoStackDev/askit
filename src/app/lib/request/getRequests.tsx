import { FeedsResponse, RequestResponseType } from "@/app/types";

export default async function getRequests(
  currentFeedsUrl?: URL | null,
  setCurrentFeedsUrl?: React.Dispatch<React.SetStateAction<URL | null>>
) {
  let url = currentFeedsUrl
    ? currentFeedsUrl
    : new URL(`${process.env.API}/feeds`);

  if (setCurrentFeedsUrl) setCurrentFeedsUrl(url);

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
