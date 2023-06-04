"use client";

import RequestImgDetail from "./section/RequestImgDetail";
import Topbar from "../../../components/Topbar";
import Responses from "../../../components/Responses";
import Button from "@/components/ui/Button";
import RequestResponseForm from "@/components/RequestResponseForm";
import React from "react";
import Navbar from "@/components/Navbar";
import { responsesConfig } from "@/config.ts/responses";

const CommentsIcon = React.lazy(() => import("@mui/icons-material/Quickreply"));

export default function RequestsPage() {
  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(false);
  const openSidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <div>
      <Navbar showSidebar={showSidebar} className="sticky top-0" />

      <div className="relative bg-background md:py-14 md:px-[100px] mb-20">
        <div className="md:grid md:grid-cols-[67%_33%] md:gap-5">
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
            <Responses
              title="Responses (4)"
              titleIcon={
                <React.Suspense
                  fallback={
                    <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
                  }
                >
                  <CommentsIcon className="text-white" />
                </React.Suspense>
              }
              responses={responsesConfig}
              className="mt-8 md:mt-14 mx-[20px] md:mx-0"
            />
          </div>

          <div className="hidden md:block absolute md:relative before:content-[''] before:w-screen before:h-screen before:bg-[red]">
            <RequestResponseForm />
          </div>
        </div>
      </div>
    </div>
  );
}
