import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[20px] px-5 py-10 bg-black text-white mb-10",
          className
        )}
        {...props}
      >
        <ol className="font-body text-title_1 font-medium flex flex-col gap-5">
          <li className="border-[1px] border-white rounded-lg">
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

            <ol className="flex flex-col gap-[15px]">
              <li>
                <Link
                  href="/"
                  className="whitespace-nowrap flex w-full pl-10 pr-[22px] my-3 items-center justify-between"
                >
                  <span>Products</span>
                  <Image
                    src="/images/icons/arrow.png"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px]"
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
                    src="/images/icons/arrow.png"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px]"
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
                    src="/images/icons/arrow.png"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px]"
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
                    src="/images/icons/arrow.png"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px]"
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
                    src="/images/icons/arrow.png"
                    alt="goto"
                    height={11.31}
                    width={6.71}
                    className="h-[11.31px] w-[6.71px]"
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
