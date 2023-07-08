"use client";

import RequestImgDetail from "./section/RequestImgDetail";
import Topbar from "../../../components/Topbar";
import Responses from "../../../components/Responses";
import Button from "@/components/ui/Button";
import RequestResponseForm from "@/components/RequestResponseForm";
import React from "react";
import { responsesConfig } from "@/config.ts/responses";
import Dialog from "@/components/ui/DialogPrimitive";
import { usePathname } from "next/navigation";
import { RequestDetailType } from "@/app/types";
import { getRequestDetail } from "@/app/lib/request";
import { useGlobalContext } from "@/app/context/Store";

const CommentsIcon = React.lazy(() => import("@mui/icons-material/Quickreply"));

export default function RequestsPage() {
  const [requestData, setReqeustData] =
    React.useState<RequestDetailType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const pathUrl = usePathname();

  const requestId = pathUrl.split("/")[2];

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userDetails = window.localStorage.getItem("userDetails");

    if (!token || !userDetails) {
      window.location.replace("/login");
    } else
      (async () => {
        try {
          const requestRes = await getRequestDetail(token, Number(requestId));
          setReqeustData(requestRes);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [requestId]);

  console.log(requestData)

  return (
    <main className="flex flex-col md:grid md:grid-cols-[1fr_348px] md:mx-[100px] md:gap-5 bg-background md:py-14 mb-20">
      <div>
        <Topbar>{requestData && requestData.request.category}</Topbar>
        {requestData && (
          <RequestImgDetail
            bookmark={requestData.request.bookmark}
            image_url={requestData.request.image_url}
            category={requestData.request.category}
            description={requestData.request.description}
            location={requestData.request.location}
            title={requestData.request.title}
            user={requestData.request.user}
            created_at={requestData.request.created_at}
            requestid={requestId}
            num_of_responses={requestData.request.num_of_responses}
          />
        )}
        <div className="flex items-center justify-center h-fit w-full px-[20px]">
          <Dialog
            dialogTrigger={
              <Button className="md:hidden mt-8 w-full">
                Respond to Request
              </Button>
            }
            className="-translate-x-1/2 z-30 fixed top-0 left-1/2"
          >
            <RequestResponseForm
              setRequests={setReqeustData}
              requestData={requestData}
              className="w-screen h-screen"
            />
          </Dialog>
        </div>

        <div className="flex flex-col items-center justify-center h-fit mt-8 md:mt-14 px-[20px] md:px-0 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center">
              <React.Suspense
                fallback={
                  <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
                }
              >
                <CommentsIcon className="text-white" fontSize="large" />
              </React.Suspense>

              <div className="font-headline text-white text-headline_3 md:text-headline_2 font-bold">
                Responses (
                {requestData && requestData.responses.length > 0
                  ? requestData.responses.length
                  : 0}
                )
              </div>
            </div>
          </div>

          {requestData && (
            <Responses responses={requestData.responses} className="mt-6" />
          )}
        </div>
      </div>

      <div className="hidden md:block absolute md:relative before:content-[''] before:w-screen before:h-screen before:bg-[red]">
        <RequestResponseForm
          setRequests={setReqeustData}
          requestData={requestData}
        />
      </div>
    </main>
  );
}
