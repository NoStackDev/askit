"use client";

import { responsesConfig } from "@/config.ts/responses";
import React from "react";

const UserInfo = React.lazy(() => import("@/components/UserInfo"));
const Responses = React.lazy(() => import("@/components/Responses"));
const EditIcon = React.lazy(() => import("@mui/icons-material/Edit"));

type Props = {};

const Page = (props: Props) => {

  return (
    <div className="relative bg-background md:mt-14 md:mb-10 md:ml-[112px] md:mr-[100px]">
      <div className="flex items-center justify-between w-full mx-[20px] md:mx-0">
        <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center font-headline text-white text-headline_2 font-bold">
          Profile
        </div>

        <div className="w-fit flex gap-[10px] p-2 items-center hover:cursor-pointer">
          <React.Suspense>
            <EditIcon className="text-primary" />
          </React.Suspense>

          <div className="font-body text-primary text-title_2 font-medium">
            Edit Profile
          </div>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-[348px_1fr] gap-6">
        <React.Suspense>
          <UserInfo variant="profile" className="mt-10" />
        </React.Suspense>

        <div className="col-span-2 mt-14">
          <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center font-headline text-white text-headline_2 font-bold">
            My Responses
          </div>

          <React.Suspense>
            <Responses
              title="ALL Response"
              responses={responsesConfig.slice(0, 4)}
              className="grid grid-cols-r-cards"
              variant="user"
            />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
