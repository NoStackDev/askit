"use client";

import Requests from "@/components/Requests";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getBookmarks } from "../lib/bookmark";
import { useRequestContext } from "../context/requestContext";
import LoadingDots from "@/components/LoadingDots";

type Props = {};

export default function SavedRequestsPage({}: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { requests, setRequests } = useRequestContext();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
    }
  }, []);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    (async () => {
      if (token) {
        const bookmarksRes = await getBookmarks(token);
        if (bookmarksRes.error) {
          console.log(bookmarksRes);
        }
        if (bookmarksRes.data) {
          setRequests(bookmarksRes.data);
          setIsLoading(false);
        }
      } else {
        window.location.assign("/login");
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main className="px-[20px] md:px-0 md:ml-[112px] pt-14 flex flex-col gap-6 md:mr-[100px] mb-10 md:mb-0">
      <div className="font-headline text-headline_2 font-bold text-white bg-[#48466D] w-fit h-fit">
        Saved Requests
      </div>

      <div className="min-h-[150px] md:min-h-[300px] relative">
        {isLoading && (
          <LoadingDots className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
        )}

        {requests && requests.length > 0 && (
          <>
            <Requests
              requests={requests.reverse()}
              requestType="SAVEDREQUESTPAGE"
            />
          </>
        )}

        {requests && requests.length < 1 && (
          <div className="flex flex-col justify-center items-center mt-10">
            <Image
              src="/images/pictures/savedRequestsEmpty.png"
              height={150}
              width={121.2}
              alt="there are no notifications"
            />

            <p className="mt-8 font-headline text-headline_3 font-bold text-black">
              No Saved Request Yet
            </p>
            <p className="mt-4 font-body text-body_2 text-[#000000]/60 max-w-[328px] text-center">
              To save, click on the bookmark icon on any request you wish to
              reference later.
            </p>
            <Link href={"/"} className="mt-12 h-fit w-fit">
              <Button className="font-body text-title_3 font-medium px-8 py-2 text-white">
                Go Back
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
