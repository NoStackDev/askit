"use client";

import { getOtherUser } from "@/app/lib/user";
import { RequestDetailResponseType, UserType } from "@/app/types";
import { responsesConfig } from "@/config.ts/responses";
import { usePathname } from "next/navigation";
import React from "react";

const Topbar = React.lazy(() => import("@/components/Topbar"));
const UserInfo = React.lazy(() => import("../../../components/UserInfo"));
const Responses = React.lazy(() => import("@/components/Responses"));
const FlagIcon = React.lazy(() => import("@mui/icons-material/Flag"));

type Props = {};

const UserPage = (props: Props) => {
  const [user, setUser] = React.useState<UserType | null>(null);
  const [responses, setResponses] = React.useState<RequestDetailResponseType[]>(
    []
  );

  const userId = usePathname().split("/")[2];

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        window.location.assign("/login");
        return;
      }

      const userDetails = await getOtherUser(token, Number(userId));
      setUser(userDetails);
    })();
  }, []);

  return (
    <main className="md:mx-[100px] relative bg-background px-5 md:py-10 mb-20">
      <div className="flex flex-col gap-6">
        <div className="bg-secondary w-fit mb-[6] p-2 items-center font-headline text-white text-headline_3 font-bold">
          Profile
        </div>

        <React.Suspense>
          <UserInfo userDetails={user} className="mt-10" />
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
