"use client";

import { responsesConfig } from "@/config.ts/responses";
import React from "react";

const Topbar = React.lazy(() => import("@/components/Topbar"));
const UserInfo = React.lazy(() => import("../../../components/UserInfo"));
const Responses = React.lazy(() => import("@/components/Responses"));
const FlagIcon = React.lazy(() => import("@mui/icons-material/Flag"));

type Props = {};

const Page = (props: Props) => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div className="relative bg-background px-5 md:px-0 md:py-10 mb-20">
      <React.Suspense>
        <Topbar className="">Seller Details</Topbar>
      </React.Suspense>

      <div className="flex flex-col md:grid md:grid-cols-[348px_1fr] gap-6">
        <React.Suspense>
          <UserInfo className="mt-10" />
        </React.Suspense>

        <div className="flex flex-col items-center justify-center h-fit w-fit mt-8 md:mt-14 mx-[20px] md:mx-0">
          <div className="flex justify-between items-start w-full">
            <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center font-headline text-white text-headline_2 font-bold">
              All Response
            </div>

            <div className="w-fit flex gap-[10px] p-2 items-center hover:cursor-pointer">
              <React.Suspense>
                <FlagIcon className="text-stroke" />
              </React.Suspense>

              <div className="font-body text-black/80 text-title_3 font-medium">
                Report User
              </div>
            </div>
          </div>

          <React.Suspense>
            <Responses
              title="ALL Response"
              responses={responsesConfig.slice(0, 4)}
            />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
