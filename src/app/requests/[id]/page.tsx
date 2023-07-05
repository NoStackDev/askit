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
  const { token } = useGlobalContext();
  const [request, setRequest] = React.useState<any>()

  const requestId = pathUrl.split("/")[2];

  React.useEffect(() => {
    (async () => {
      try {
        let _token = token ? token : "";
        const requestRes = await getRequestDetail(_token, Number(requestId));
        setRequest(requestRes)
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, requestId]);

  return (
    <main className="flex flex-col md:grid md:grid-cols-[1fr_348px] md:mx-[100px] md:gap-5 bg-background md:py-14 mb-20">
      <div>
        <Topbar>{request?.request.category}</Topbar>
        {request && (
          <RequestImgDetail
            bookmark={request.request.bookmark}
            image_url={request.request.image_url}
            category={request.request.category}
            description={request.request.description}
            location={request.request.location}
            title={request.request.title}
            user={request.request.title}
            created_at={request.request.created_at}
            requestId={requestId}
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
            <RequestResponseForm className="w-screen h-screen" />
          </Dialog>
        </div>

        <div className="flex flex-col items-center justify-center h-fit w-fit mt-8 md:mt-14 mx-[20px] md:mx-0">
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
                Responses ({requestData ? requestData.responses.length : 0})
              </div>
            </div>
          </div>

          {requestData && (
            <Responses responses={requestData.responses} className="mt-6" />
          )}
        </div>
      </div>

      <div className="hidden md:block absolute md:relative before:content-[''] before:w-screen before:h-screen before:bg-[red]">
        <RequestResponseForm />
      </div>
    </main>
  );
}
