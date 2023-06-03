"use client";

import Navbar from "@/components/Navbar";
import Responses from "@/components/Responses";
import Topbar from "@/components/Topbar";
import { responsesConfig } from "@/config.ts/responses";
import React from "react";

const UserInfo = React.lazy(() => import("./section/UserInfo"));
const AllResponses = React.lazy(() => import("./section/AllResponses"));

type Props = {};

const Page = (props: Props) => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="">
      <Navbar showSidebar={showSidebar} />

      <div className="relative bg-background px-5 md:py-10 md:px-[100px] mb-20">
        <Topbar className="">Seller Details</Topbar>

        <div className="md:grid md:grid-cols-[32fr_68fr] gap-6">
          <React.Suspense>
            <UserInfo className="mt-10" />
          </React.Suspense>

          <React.Suspense>
            <Responses title="All Response" responses={responsesConfig} className="mt-[90px]"/>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
