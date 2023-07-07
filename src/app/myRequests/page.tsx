"use client";

import PageNumbers from "@/components/PageNumbers";
import Requests from "@/components/Requests";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RequestType } from "../types";
import { getUserRequests } from "../lib/request";
import { useGlobalContext } from "../context/Store";
import { useRequestContext } from "../context/requestContext";
import RequestForm from "@/components/RequestForm/RequestForm";
import Dialog from "@/components/ui/DialogPrimitive";

type Props = {};

export default function MyRequestPage({}: Props) {
  const { requests, setRequests } = useRequestContext();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userDetails = window.localStorage.getItem("userDetails");
    (async () => {
      try {
        if (token) {
          const res = await getUserRequests(token);
          setRequests(res.data.reverse());
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <main className="px-[20px] md:px-0 md:ml-[112px] pt-14 flex flex-col gap-6 md:mr-[100px] mb-10 md:mb-0">
      <div className="font-headline text-headline_2 font-bold text-white bg-[#48466D] w-fit h-fit">
        My Requests
      </div>

      <div>
        {requests && requests.length > 0 ? (
          <>
            <Requests requests={requests} variants="user" className="mt-6" />
            {/* <div className="w-full flex flex-col items-center justify-center">
              <Button variant="outlined" className="mt-12 md:mt-14 w-[255px]">
                Next Page
              </Button>
            </div> */}

            {/* can't fix pages number be api response is unknown */}
            {/* <div>
              <PageNumbers  className="mt-6" />
            </div> */}
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
            <Dialog
              dialogTrigger={
                <Button className="mt-12 font-body text-title_3 font-medium px-8 py-2 text-white">
                  Place a Request
                </Button>
              }
              className="-translate-x-1/2 z-30 fixed top-[80px] left-1/2"
            >
              <RequestForm className="" />
            </Dialog>
          </div>
        )}
      </div>
    </main>
  );
}
