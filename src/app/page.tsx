"use client";

import DealsCard from "@/components/DealsCard";
import Navbar from "@/components/Navbar";
import PageNumbers from "@/components/PageNumbers";
import Requests from "@/components/Requests";
import RequestsFilter from "@/components/RequestsFilter";
import Searchbox from "@/components/Searchbox";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const openSidebarRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(openSidebarRef, setShowSidebar);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);

    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "" : "hidden";
  };

  return (
    <main className="relative">
      <div
        className={cn(
          "fixed top-0 h-0 w-screen bg-black/5 backdrop-blur-sm z-20 overflow-hidden transition-all duration-[600ms] ease-in-out md:!hidden",
          showSidebar && "h-screen"
        )}
      ></div>

      <Navbar
        showSidebar={showSidebar}
        handleSidebar={handleSidebar}
        className="sticky top-0"
      />

      <div className="relative flex md:gap-[92px] md:px-[100px] md:mb-10">
        <div
          className={cn(
            "fixed -translate-y-20 md:translate-y-0 md:relative -left-full md:left-0 md:mt-14 z-30 md:z-0 transition-all duration-300 ease-in-out",
            showSidebar && "left-0"
          )}
          ref={openSidebarRef}
        >
          <Sidebar />
        </div>

        <div className="mx-5 my-6 mt-[56px] w-full z-10">
          <Searchbox className="md:hidden" />

          <DealsCard className="md:hidden mt-5">
            <Image
              src="/images/pictures/deals.png"
              width={352}
              height={113}
              alt="deals"
            />
          </DealsCard>

          <div className="hidden md:grid grid-cols-[77%_23%] gap-[30px]">
            <div className="bg-[#D1D9DE] rounded-[20px] h-[174px] flex justify-center items-center font-headline text-headline_1 font-bold text-white">
              Latests Requests
            </div>

            <div className="font-inter text-[24px] text-[#000000] flex justify-center items-center text-center bg-[#48466D]">
              Make a Request
            </div>
          </div>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="bg-[#48466D] w-fit text-white text-headline_3 md:text-headline_2 font-headline">
              Latest Requests
            </div>

            <div className="">
              <RequestsFilter />
            </div>
          </div>

          <Requests requests={requestsConfig} className="mt-4 md:mt-8" />

          <div className="w-full flex flex-col items-center justify-center">
            <Button variant="outlined" className="mt-6 md:mt-14 w-[255px]">
              Next Page
            </Button>
          </div>

          <div>
            <PageNumbers totalPages={10} currentPage={1} className="mt-6" />
          </div>
        </div>
      </div>

      <Link href="/request/" className="md:hidden h-fit w-fit">
        <Button
          className={cn(
            "md:hidden fixed bottom-10 right-5 z-20",
            showSidebar && "hidden"
          )}
        >
          Place a Request
        </Button>
      </Link>
    </main>
  );
}
