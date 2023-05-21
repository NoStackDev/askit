"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { sidebarConfig } from "@/config.ts/sidebarConfig";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const path = usePathname();

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[20px] px-5 py-10 bg-black text-white mb-10 min-w-[255px]",
          className
        )}
        {...props}
      >
        <ol className="font-body text-title_1 font-medium flex flex-col gap-5">
          {sidebarConfig.map((sidebarEle) => {
            return (
              <SidebarItem item={sidebarEle} path={path} key={sidebarEle.id} />
            );
          })}
        </ol>
      </div>
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
          className={clsx(
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
                <li>
                  <Link
                    href={childEle.href || "/"}
                    className="whitespace-nowrap flex w-full pl-10 pr-[22px] my-3 items-center justify-between"
                    key={childEle.id}
                  >
                    <span>{childEle.title}</span>
                    <Image
                      src="/images/icons/arrow.svg"
                      alt="goto"
                      height={11.31}
                      width={6.71}
                      className="h-[11.31px] w-[6.71px] fill-white invert-[100%] sepia-[100%] saturate-0 hue-rotate-[159deg] brightness-[106%] contrast-[103%]"
                    />
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
