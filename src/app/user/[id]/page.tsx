"use client";

import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import React from "react";
import UserInfo from "./section/UserInfo";

// const UserInfo = React.lazy(() => import("./section/UserInfo"));

type Props = {};

const Page = (props: Props) => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="">
      <Navbar showSidebar={showSidebar} />

      <div className="relative bg-background px-5 md:py-10 md:px-[100px] mb-20">
        <Topbar className="">Seller Details</Topbar>

        <div className="md:grid md:grid-cols-[32%_1fr]">
          <UserInfo className="mt-10" />
        </div>
      </div>
    </div>
  );
};

export default Page;
