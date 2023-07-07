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

  return res.json();
}
