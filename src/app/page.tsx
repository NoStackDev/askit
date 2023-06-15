"use client";

import DealsCard from "@/components/DealsCard";
import PageNumbers from "@/components/PageNumbers";
import Requests from "@/components/Requests";
import RequestsFilter from "@/components/RequestsFilter";
import Searchbox from "@/components/Searchbox";
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
    <main className="relative md:mr-[100px] md:ml-[60px]">
      <div className="relative flex md:gap-[92px] md:mb-10">
        <div className="mx-5 my-6 mt-[24px] md:mt-[56px] w-full z-10">
          <Searchbox className="md:hidden" />

          <div className="flex gap-6 md:grid md:grid-cols-[75%_25%]">
            <DealsCard className="mt-5 md:mt-0 w-full">
              <Image
                src="/images/pictures/deals.png"
                width={540}
                height={174}
                alt="deals"
                className="w-full h-auto max-h-[250px]"
              />
            </DealsCard>

            <div className="hidden md:flex md:flex-col w-full border stroke-secondary rounded-xl bg-white items-center px-3 justify-between">
              <div className="mt-4 font-headline font-bold text-headline_3 text-secondary text-center">
                Don’t Search Aimlessly
              </div>
              <div className="font-body font-light text-special text-black">
                for whatever you want!
              </div>
              <Link href="/request" className="w-full mb-[14px]">
                <Button variant="outlined2" className="w-full py-[5px]">Request for it</Button>
              </Link>
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
            <Button variant="outlined" className="mt-12 md:mt-14 w-[255px]">
              Next Page
            </Button>
          </div>

          <div>
            <PageNumbers totalPages={10} currentPage={1} className="mt-6" />
          </div>
        </div>
      </div>

      <Link href="/request/" className="md:hidden h-fit w-fit">
        <Button className={cn("md:hidden fixed bottom-10 right-5 z-20")}>
          Place a Request
        </Button>
      </Link>
    </main>
  );
}
