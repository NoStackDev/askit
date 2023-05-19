"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { usePathname } from "next/navigation"
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const path = usePathname()
    console.log(path)

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
          <li className={clsx("border-[1px] border-white rounded-lg", path==="/" && 'bg-white text-black')}>
            <Link
              href="/"
              className="whitespace-nowrap inline-flex w-full px-4 py-2"
            >
              Home
            </Link>
          </li>

          <li className="border-[1px] border-white rounded-[4px] pb-3">
            {/* <Link
              href="/"
              className="whitespace-nowrap inline-flex w-full px-4 py-2"
            >
              Categories
            </Link> */}
            <span className="whitespace-nowrap inline-flex w-full px-4 py-2">
              Categories
            </span>

            <ol className="flex flex-col gap-[15px] text-title_3">
              <li>
                <Link
                  href="/"
                  className="whitespace-nowrap flex w-full pl-10 pr-[22px] my-3 items-center justify-between"
                >
                  <span>Products</span>
                  <Image
                    src="/images/icons/arrow.svg"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px] fill-white invert-[100%] sepia-[100%] saturate-0 hue-rotate-[159deg] brightness-[106%] contrast-[103%]"
                  />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="whitespace-nowrap flex w-full pl-10 pr-[22px] items-center justify-between"
                >
                  <span>Services</span>
                  <Image
                    src="/images/icons/arrow.svg"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px] fill-white invert-[100%] sepia-[100%] saturate-0 hue-rotate-[159deg] brightness-[106%] contrast-[103%]"
                  />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="whitespace-nowrap flex w-full pl-10 pr-[22px] items-center justify-between"
                >
                  <span>Accomodation</span>
                  <Image
                    src="/images/icons/arrow.svg"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px] fill-white invert-[100%] sepia-[100%] saturate-0 hue-rotate-[159deg] brightness-[106%] contrast-[103%]"
                  />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="whitespace-nowrap flex w-full pl-10 pr-[22px] items-center justify-between"
                >
                  <span>Job</span>
                  <Image
                    src="/images/icons/arrow.svg"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px] fill-white invert-[100%] sepia-[100%] saturate-0 hue-rotate-[159deg] brightness-[106%] contrast-[103%]"
                  />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="whitespace-nowrap flex w-full pl-10 pr-[22px] items-center justify-between"
                >
                  <span>Suggestion</span>
                  <Image
                    src="/images/icons/arrow.svg"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px] fill-white invert-[100%] sepia-[100%] saturate-0 hue-rotate-[159deg] brightness-[106%] contrast-[103%]"
                  />
                </Link>
              </li>
            </ol>
          </li>

          <li className="border-[1px] border-white rounded-lg">
            <Link
              href="/"
              className="whitespace-nowrap inline-flex w-full px-4 py-2"
            >
              My Requests
            </Link>
          </li>

          <li className="border-[1px] border-white rounded-lg">
            <Link
              href="/"
              className="whitespace-nowrap inline-flex w-full px-4 py-2"
            >
              Saved
            </Link>
          </li>

          <li className="border-[1px] border-white rounded-lg">
            <Link
              href="/"
              className="whitespace-nowrap inline-flex w-full px-4 py-2"
            >
              Profile
            </Link>
          </li>

          <li className="border-[1px] border-white rounded-lg">
            <Link
              href="/"
              className="whitespace-nowrap inline-flex w-full px-4 py-2"
            >
              Help
            </Link>
          </li>
        </ol>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
