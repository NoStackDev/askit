"use client";

import PageNumbers from "@/components/PageNumbers";
import Requests from "@/components/Requests";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  const [myRequests, setMyRequests] = React.useState<any>();

  return (
    <main className="px-[20px] md:px-0 md:ml-[112px] pt-14 flex flex-col gap-6 md:mr-[100px] mb-10 md:mb-0">
      <div className="font-headline text-headline_2 font-bold text-white bg-[#48466D] w-fit h-fit">
        My Requests
      </div>

      <div>
        {myRequests && myRequests.data.length > 0 ? (
          <>
            <Requests requests={requestsConfig.slice(2, 4)} className="mt-6" />

            <div className="w-full flex flex-col items-center justify-center">
              <Button variant="outlined" className="mt-12 md:mt-14 w-[255px]">
                Next Page
              </Button>
            </div>

            <div>
              <PageNumbers totalPages={10} currentPage={1} className="mt-6" />
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mt-10">
            <Image
              src="/images/pictures/requestEmpty.png"
              height={150}
              width={177.16}
              alt="there are no requests"
            />

            <p className="mt-8 font-headline text-headline_3 font-bold text-black">
              You’ve Made No Request Yet
            </p>
            <p className="mt-4 font-body text-body_2 text-[#000000]/60 max-w-[328px] text-center">
              Place a request to the community of whatever you are having
              difficulty in finding
            </p>
            <Link href={"/request"} className="mt-12 h-fit w-fit">
              <Button className="font-body text-title_3 font-medium px-8 py-2 text-white">
                Place a Request
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
