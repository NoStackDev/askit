"use client";

import Requests from "@/components/Requests";
import { requestsConfig } from "@/config.ts/requests";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="md:ml-[112px] pt-14 flex flex-col gap-6 md:mr-[100px]">
      <div className="font-headline text-headline_2 font-bold text-white bg-[#48466D] w-fit h-fit">
        My Requests
      </div>
      <Requests requests={requestsConfig.slice(2, 4)} />
    </main>
  );
}
