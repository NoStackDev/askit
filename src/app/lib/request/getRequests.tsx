import { FeedsResponse, RequestResponseType } from "@/app/types";

export default async function getRequests(currentFeedsUrl?: URL | null) {
  const url = currentFeedsUrl ? currentFeedsUrl : `${process.env.API}/feeds`;
  const res = await fetch(url, {
    method: "OPTIONS",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
}
