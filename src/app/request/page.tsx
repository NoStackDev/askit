'use client'

import Navbar from "@/components/Navbar";
import RequestForm from "@/components/RequestForm";
import Topbar from "@/components/Topbar";
import React from "react";

type Props = {};

export default function RequestPage({}: Props) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const openSidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="bg-background">
      <Navbar showSidebar={showSidebar} className="sticky top-0" />

      <div className="relative bg-background md:py-10 md:px-[284px] mb-20">
          <Topbar className="hidden md:flex">Place a Request of What you want</Topbar>
          <Topbar className="md:hidden">Place a Request</Topbar>
          <RequestForm />
      </div>
    </div>
  );
}
