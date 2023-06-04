"use client";

import { responsesConfig } from "@/config.ts/responses";
import React from "react";

const Navbar = React.lazy(() => import("@/components/Navbar"));
const Topbar = React.lazy(() => import("@/components/Topbar"));
const UserInfo = React.lazy(() => import("./section/UserInfo"));
const Responses = React.lazy(() => import("@/components/Responses"));
const FlagIcon = React.lazy(() => import("@mui/icons-material/Flag"));

type Props = {};

const Page = (props: Props) => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="">
      <React.Suspense>
        <Navbar showSidebar={showSidebar} />
      </React.Suspense>

      <div className="relative bg-background px-5 md:py-10 md:px-[100px] mb-20">
        <Topbar className="">Seller Details</Topbar>

        <div className="md:grid md:grid-cols-[32fr_68fr] gap-6">
          <React.Suspense>
            <UserInfo className="mt-10" />
          </React.Suspense>

          <React.Suspense>
            <Responses
              title="All Response"
              responses={responsesConfig.slice(0, 4)}
              className="mt-[90px]"
              otherText="Report User"
              otherIcon={
                <React.Suspense>
                  <FlagIcon className="text-stroke"/>
                </React.Suspense>
              }
            />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
