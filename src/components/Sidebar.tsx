"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sidebarConfig, sidebarConfig1 } from "@/config.ts/sidebarConfig";
import { getCategories } from "@/app/lib/category";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion1";
import { useSidebarContext } from "@/app/context/sidebarContext";
import useOnClickOutside from "@/hooks/useOnclickOutside";

const ExpandMoreIcon = React.lazy(
  () => import("@mui/icons-material/ExpandMore")
);

const renderInPage = [
  "",
  "profile",
  "savedRequests",
  "myRequests",
  "notification",
  "settings",
];

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const { showSidebar, setShowSidebar } = useSidebarContext();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(sidebarRef, setShowSidebar);

    const path = usePathname();
    const pathUrl = path.split("/")[1];
    let renderSidebar: string | undefined | boolean = renderInPage.find(
      (urlSplit) => urlSplit === pathUrl
    );
    renderSidebar = renderSidebar === "" ? true : Boolean(renderSidebar);

    useEffect(() => {
      if (showSidebar) {
        document.body.style.overflow = "hidden";
      }
    }, [showSidebar]);

    return (
      <>
        {showSidebar && (
          <div className="fixed top-0 bg-stroke/60 z-40 md:hidden w-screen h-screen"></div>
        )}

        <div
          className={cn(
            "px-5 py-10 bg-[#2E2775] flex flex-col gap-5 h-fit md:rounded-[20px] md:ml-[100px] md:mt-14 md:w-[300px]",
            !showSidebar && "hidden md:flex",
            showSidebar &&
              "fixed top-0 w-screen max-w-[300px] z-50 overflow-auto",
            className
          )}
          ref={sidebarRef}
        >
          {sidebarConfig1.map((sidebarItem) => {
            return (
              <div
                className={cn(
                  "border border-white rounded-lg overflow-clip w-full"
                )}
                key={sidebarItem.id}
              >
                {sidebarItem.href ? (
                  <Link
                    href={sidebarItem.href}
                    className={cn(
                      "block w-full px-4 py-2 hover:bg-white hover:cursor-pointer font-body font-medium text-white text-[18px] hover:text-black",
                      "/" + pathUrl === sidebarItem.href &&
                        "bg-white text-black"
                    )}
                  >
                    {sidebarItem.title}
                  </Link>
                ) : (
                  <div className="text-white font-body font-medium w-full px-4 mt-4">
                    {sidebarItem.title}
                  </div>
                )}

                {sidebarItem.children && (
                  <Accordion
                    type="single"
                    collapsible
                    className={cn("flex flex-col gap-3 items-start mt-3")}
                  >
                    {sidebarItem.children.map((sidebarItemChild) => {
                      return (
                        <AccordionItem
                          value={sidebarItemChild.id}
                          key={sidebarItemChild.id}
                          className="w-full"
                        >
                          <AccordionTrigger
                            icon={
                              <React.Suspense
                                fallback={
                                  <div className="w-4 h-4 bg-stroke/60 animate-pulse"></div>
                                }
                              >
                                <ExpandMoreIcon className="text-white/50 group-hover:text-black/50 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                              </React.Suspense>
                            }
                            headerClassName="w-full"
                            className="px-4 py-2 group hover:cursor-pointer hover:bg-white w-full flex items-center justify-between"
                          >
                            <div className="text-white group-hover:text-black font-body font-medium text-title_3">
                              {sidebarItemChild.title}
                            </div>
                          </AccordionTrigger>
                          {sidebarItemChild.subChildren?.map(
                            (sidebarItemChildSubChild) => {
                              return (
                                <AccordionContent
                                  key={sidebarItemChildSubChild.id}
                                  className="text-title_3"
                                >
                                  <div className="hover:cursor-pointer hover:bg-white hover:text-black font-body text-white font-medium w-full py-2 pl-8 first:mt-3">
                                    {sidebarItemChildSubChild.title}
                                  </div>
                                </AccordionContent>
                              );
                            }
                          )}
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
