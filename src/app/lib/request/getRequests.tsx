import { FeedsResponse } from "@/app/types";

type ActionI = {
  type: "FETCHING" | "SUCCESS" | "FAILED" | null;
  payload?: FeedsResponse;
};

export default async function getRequests(dispatch: React.Dispatch<ActionI>) {
  dispatch({ type: "FETCHING" });
  const res = await fetch(`${process.env.API}/feeds`, {
    method: "OPTIONS",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
}
