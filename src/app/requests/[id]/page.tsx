"use client";

import RequestImgDetail from "./section/RequestImgDetail";
import Topbar from "../../../components/Topbar";
import Responses from "../../../components/Responses";
import Button from "@/components/ui/Button";
import RequestResponseForm from "@/components/RequestResponseForm";
import React from "react";
import { responsesConfig } from "@/config.ts/responses";
import Dialog from "@/components/ui/DialogPrimitive";

const CommentsIcon = React.lazy(() => import("@mui/icons-material/Quickreply"));

export default function RequestsPage() {
  return (
    <main className="flex flex-col md:grid md:grid-cols-[1fr_348px] md:mx-[100px] md:gap-5 bg-background md:py-14 mb-20">
      <div>
        <Topbar>Fashion</Topbar>
        <RequestImgDetail />
        <div className="flex items-center justify-center h-fit w-full px-[20px]">
          <Dialog
            dialogTrigger={
              <Button className="md:hidden mt-8 w-full">
                Respond to Request
              </Button>
            }
            dialogContent={<RequestResponseForm />}
            className="h-full overflow-auto top-0 -translate-y-0"
          />
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
                Responses (4)
              </div>
            </div>
          </div>

          <Responses responses={responsesConfig} className="mt-6" />
        </div>
      </div>

      <div className="hidden md:block absolute md:relative before:content-[''] before:w-screen before:h-screen before:bg-[red]">
        <RequestResponseForm />
      </div>
    </main>
  );
}
