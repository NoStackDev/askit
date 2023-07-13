"use client";

import { RequestDetailResponseType } from "@/app/types";
import { responsesConfig } from "@/config.ts/responses";
import React from "react";

const Topbar = React.lazy(() => import("@/components/Topbar"));
const UserInfo = React.lazy(() => import("../../../components/UserInfo"));
const Responses = React.lazy(() => import("@/components/Responses"));
const FlagIcon = React.lazy(() => import("@mui/icons-material/Flag"));

type Props = {};

const UserPage = (props: Props) => {
  const [responses, setResponses] = React.useState<RequestDetailResponseType[]>(
    []
  );

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <main className="md:mx-[100px] relative bg-background px-5 md:py-10 mb-20">
      <React.Suspense>
        <Topbar className="">Seller Details</Topbar>
      </React.Suspense>

      <div className="flex flex-col md:grid md:grid-cols-[348px_1fr] gap-6">
        <React.Suspense>
          <UserInfo className="mt-10" />
        </React.Suspense>

        <div className="flex flex-col items-center justify-center h-fit w-full mt-8 md:mt-14">
          <div className="flex justify-between items-start w-full">
            <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center font-headline text-white text-headline_3 md:text-headline_2 font-bold">
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
            <Responses responses={responses} className="mt-6" />
          </React.Suspense>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
