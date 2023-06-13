"use client";

import RequestImgDetail from "./section/RequestImgDetail";
import Topbar from "../../../components/Topbar";
import Responses from "../../../components/Responses";
import Button from "@/components/ui/Button";
import RequestResponseForm from "@/components/RequestResponseForm";
import React from "react";
import Navbar from "@/components/Navbar1";
import { responsesConfig } from "@/config.ts/responses";

const CommentsIcon = React.lazy(() => import("@mui/icons-material/Quickreply"));

export default function RequestsPage() {
  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(false);
  const openSidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[1fr_348px] md:gap-5 bg-background md:py-14 mb-20">
      <div>
        <Topbar>Fashion</Topbar>
        <RequestImgDetail />
        <div className="flex items-center justify-center h-fit w-full">
          <Button
            className="md:hidden w-4/5 mt-8"
            onClick={() => setShowRequestForm(true)}
          >
            Respond to Request
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center h-fit w-fit mt-8 md:mt-14 mx-[20px] md:mx-0">
          <div className="flex justify-between items-start w-full">
            <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center">
              <React.Suspense
                fallback={
                  <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
                }
              >
                <CommentsIcon className="text-white" />
              </React.Suspense>

              <div className="font-headline text-white text-headline_2 font-bold">
                Responses (4)
              </div>
            </div>
          </div>

          <Responses responses={responsesConfig} />
        </div>
      </div>

      <div className="hidden md:block absolute md:relative before:content-[''] before:w-screen before:h-screen before:bg-[red]">
        <RequestResponseForm />
      </div>
    </div>
  );
}
