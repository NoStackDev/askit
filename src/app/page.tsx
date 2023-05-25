"use client";

import Advertisements from "@/components/Advertisements";
import CitySelector from "@/components/CitySelector";
import CountrySelector from "@/components/CountrySelector";
import DealsCard from "@/components/DealsCard";
import Navbar from "@/components/Navbar";
import RequestsFilter from "@/components/RequestsFilter";
import Searchbox from "@/components/Searchbox";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/ui/Button";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { cn } from "@/lib/utils";
import Requests from "@/section/Requests";
import Image from "next/image";
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
            "absolute -translate-y-20 md:translate-y-0 md:relative -left-full md:left-0 md:mt-14 z-30 md:z-0 transition-all duration-300 ease-in-out",
            showSidebar && "left-0"
          )}
          ref={openSidebarRef}
        >
          <Sidebar />
          {/* <Advertisements className="hidden md:flex">
            <div className="flex flex-col gap-1">
              <Image
                src="/images/pictures/cocacola.png"
                height={228}
                width={255}
                alt="advert"
              />
              <span className="self-start font-inter text-[12px] text-[#000000] opacity-50">
                Sponsored
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Image
                src="/images/pictures/yumyum.png"
                height={228}
                width={255}
                alt="advert"
              />
              <span className="self-start font-inter text-[12px] text-[#000000] opacity-50">
                Sponsored
              </span>
            </div>
          </Advertisements> */}
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

          <Requests className="mt-4 md:mt-8" />
        </div>
      </div>

      <Button
        className={cn(
          "md:hidden fixed bottom-10 right-5 z-20",
          showSidebar && "hidden"
        )}
      >
        Place a Request
      </Button>
    </main>
  );
}
