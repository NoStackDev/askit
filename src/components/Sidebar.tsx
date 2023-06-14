"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/config.ts/sidebarConfig";
import { sidebarItem } from "@/types";

const ChevronRight = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);

const renderInPage = [
  "",
  "profile",
  "savedRequests",
  "myRequests",
  "notification",
];

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const path = usePathname();
    const pathUrl = path.split("/")[1];
    let renderSidebar: string | undefined | boolean = renderInPage.find(
      (urlSplit) => urlSplit === pathUrl
    );
    renderSidebar = renderSidebar === "" ? true : Boolean(renderSidebar);

    return (
      <>
        {renderSidebar ? (
          <div
            ref={ref}
            className={cn(
              "rounded-[20px] px-5 py-10 bg-[#2E2775] text-white mb-10 min-w-[255px] h-fit md:mt-14 md:ml-[100px]",
              className
            )}
            {...props}
          >
            <ol className="font-body text-title_1 font-medium flex flex-col gap-5">
              {sidebarConfig.map((sidebarEle) => {
                return (
                  <SidebarItem
                    item={sidebarEle}
                    path={path}
                    key={sidebarEle.id}
                  />
                );
              })}
            </ol>
          </div>
        ) : null}
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;

interface SidebarItemProps extends HTMLAttributes<HTMLOListElement> {
  item: sidebarItem;
  path: string;
}

const SidebarItem = ({ item, path, children, className }: SidebarItemProps) => {
  return (
    <>
      {item.href && (
        <li
          className={cn(
            "border-[1px] border-white rounded-lg hover:bg-white hover:text-black",
            path === item.href && "bg-white text-black"
          )}
        >
          <Link
            href={item.href}
            className="whitespace-nowrap inline-flex w-full px-4 py-2"
          >
            {item.title}
          </Link>
        </li>
      )}

      {item.children && (
        <li className="border-[1px] border-white rounded-[4px] pb-3">
          <span className="whitespace-nowrap inline-flex w-full px-4 py-2">
            {item.title}
          </span>

          <ol className="flex flex-col gap-[15px] text-title_3">
            {item.children.map((childEle) => {
              return (
                <li key={childEle.id} className="">
                  <Link
                    href={childEle.href || "/"}
                    className="whitespace-nowrap flex w-full pl-10 pr-[22px] py-3 items-center justify-between hover:bg-white hover:text-black"
                  >
                    <span>{childEle.title}</span>
                    <React.Suspense>
                      <ChevronRight />
                    </React.Suspense>
                  </Link>
                </li>
              );
            })}
          </ol>
        </li>
      )}
    </>
  );
};
