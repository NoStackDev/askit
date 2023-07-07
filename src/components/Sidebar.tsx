"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sidebarConfig1 } from "@/config.ts/sidebarConfig";
import { getCategories } from "@/app/lib/category";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion1";
import { useSidebarContext } from "@/app/context/sidebarContext";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { useAuthContext } from "@/app/context/authContext";
import { useFeedsContext } from "@/app/context/feedsContext";
import { getRequests } from "@/app/lib/request";

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
    const { showSidebar, setShowSidebar, categories, setCategories } =
      useSidebarContext();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const { isOnboarding } = useAuthContext();

    const [selectedCategory, setSelectedCategory] = React.useState<
      string | null
    >(null);

    const { currentFeedsUrl, setCurrentFeedsUrl, setFeeds } = useFeedsContext();
    useOnClickOutside(sidebarRef, setShowSidebar);

    const path = usePathname();
    const pathUrl = path.split("/")[1];
    let renderSidebar: string | undefined | boolean = renderInPage.find(
      (urlSplit) => urlSplit === pathUrl
    );
    renderSidebar = renderSidebar === "" ? true : Boolean(renderSidebar);

    useEffect(() => {
      const token = window.localStorage.getItem("token");

      (async () => {
        try {
          if (token) {
            const categoriesRes = await getCategories(token);
            setCategories(categoriesRes);
          }
        } catch (err) {
          console.log(err);
        }
      })();

      if (showSidebar) {
        document.body.style.overflow = "hidden";
      }
    }, [showSidebar]);

    const onClickSubCategory = async (subCategoryId: number) => {
      setShowSidebar(false);

      try {
        currentFeedsUrl?.searchParams.delete("category_group_id");
        currentFeedsUrl?.searchParams.append(
          "category_group_id",
          subCategoryId.toString()
        );
        const feedsResponse = await getRequests(currentFeedsUrl);
        setFeeds(feedsResponse);
      } catch (err) {
        console.log(err);
      }
    };

    const categoryKeys = categories ? Object.keys(categories) : null;

    return (
      <>
        {isOnboarding ? null : (
          <>
            {showSidebar && (
              <div className="fixed top-0 bg-stroke/60 z-40 md:hidden w-screen h-screen"></div>
            )}
            <div
              className={cn(
                "px-5 bg-[#2E2775] h-screen md:h-fit md:rounded-[20px] md:ml-[100px] md:mt-14 md:w-[300px]",
                !showSidebar && "hidden md:flex",
                showSidebar && "fixed top-0 w-screen max-w-[300px] z-50",
                !renderSidebar && "md:hidden",
                className
              )}
              ref={sidebarRef}
            >
              <div
                className={cn(
                  "py-10 h-fit max-h-screen md:max-h-[2000px] overflow-auto no-scrollbar w-full flex flex-col gap-5"
                )}
              >
                {sidebarConfig1.map((sidebarItem) => {
                  return (
                    <div
                      className={cn(
                        "w-full",
                        !sidebarItem.href &&
                          "border border-white rounded-lg w-full",
                        showSidebar && "last:pb-10"
                      )}
                      key={sidebarItem.id}
                    >
                      {sidebarItem.href ? (
                        <Link
                          href={sidebarItem.href}
                          className={cn(
                            "block border border-white rounded-lg w-full px-4 py-2 hover:bg-white hover:cursor-pointer font-body font-medium text-white text-[18px] hover:text-black",
                            "/" + pathUrl === sidebarItem.href &&
                              "bg-white text-black"
                          )}
                          onClick={(e) => setShowSidebar(false)}
                        >
                          {sidebarItem.title}
                        </Link>
                      ) : (
                        <div className="text-white font-body font-medium w-full px-4 mt-4">
                          {sidebarItem.title}
                        </div>
                      )}

                      {sidebarItem.children && categoryKeys && (
                        <Accordion
                          type="single"
                          collapsible
                          className={cn("flex flex-col gap-3 items-start mt-3")}
                        >
                          {categoryKeys.map((category, index) => {
                            return (
                              <AccordionItem
                                value={category}
                                key={category + index}
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
                                  onClick={() => setSelectedCategory(category)}
                                >
                                  <div className="text-white group-hover:text-black font-body font-medium text-title_3">
                                    {category}
                                  </div>
                                </AccordionTrigger>
                                {categoryKeys &&
                                  selectedCategory &&
                                  categories &&
                                  categories[selectedCategory].map(
                                    (subCategory) => {
                                      return (
                                        <AccordionContent
                                          key={subCategory.id}
                                          className="text-title_3"
                                        >
                                          <div
                                            className="hover:cursor-pointer hover:bg-white hover:text-black font-body text-white font-medium w-full py-2 pl-8 first:mt-3"
                                            onClick={() =>
                                              onClickSubCategory(subCategory.id)
                                            }
                                          >
                                            {subCategory.name}
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
            </div>
          </>
        )}
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
