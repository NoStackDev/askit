"use client";

import RequestForm from "@/components/RequestForm";
import Topbar from "@/components/Topbar";
import React from "react";

type Props = {};

export default function RequestPage({}: Props) {
  return (
    <main className="bg-background">
      <div className="relative bg-background md:py-10 md:px-[284px] mb-20">
        {/* <Topbar className="hidden md:flex">Place a Request</Topbar> */}
        <Topbar className="">Place a Request</Topbar>
        <RequestForm />
      </div>
    </main>
  );
}
