"use client";

import Requests from "@/components/Requests";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function SavedRequestsPage({}: Props) {
  const [savedRequests, setSavedRequests] = React.useState<any>();
  return (
    <main className="px-[20px] md:px-0 md:ml-[112px] pt-14 flex flex-col gap-6 md:mr-[100px] mb-10 md:mb-0">
      <div className="font-headline text-headline_2 font-bold text-white bg-[#48466D] w-fit h-fit">
        Saved Requests
      </div>

      <div>
        {savedRequests && savedRequests.data.length > 0 ? (
          <>
            <Requests requests={requestsConfig.slice(2, 4)} />
          </>
        ) : (
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
