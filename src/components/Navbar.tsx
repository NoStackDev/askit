"use client";

import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import Searchbox from "./Searchbox";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";
import clsx from "clsx";

interface NavProps extends HTMLAttributes<HTMLElement> {
  handleSidebar: () => void;
  showSidebar: boolean;
}

const Navbar = React.forwardRef<HTMLElement, NavProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        className={cn(
          "p-5 md:px-[100px] flex justify-between md:grid grid-cols-3 bg-white items-center z-30",
          className
        )}
        ref={ref}
      >
        <Link href="/" className="max-w-fit flex gap-2 items-center">
          <div className="w-6 h-6 bg-primary"></div>
          <span className="font-headline text-headline_2 font-bold text-secondary md:text-black">
            AskIt
          </span>
        </Link>

        <Searchbox className="hidden md:block w-full row-start-2 col-span-3 md:row-start-1 md:col-start-2 md:col-span-1" />

        <div className="flex items-center gap-6 justify-end">
          <Link
            href="/"
            className="inline-flex py-[10px] px-3 bg-background rounded"
          >
            <Image
              src="/images/icons/notificationIcon.png"
              width={16}
              height={20}
              alt="notification"
            />
          </Link>

          <Link href="/" className="inline-flex p-3 bg-background rounded">
            <Image
              src="/images/icons/userIcon.png"
              width={16}
              height={16}
              alt="notification"
            />
          </Link>

          {!props.showSidebar && (
            <Link
              href="/"
              className={clsx(
                "md:hidden relative  h-10 w-10 bg-background rounded",
                props.showSidebar && "hidden"
              )}
              onClick={props.handleSidebar}
            >
              <div className="w-[16px] h-[2px] absolute top-[14px] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black"></div>
              <div className="w-[16px] h-[2px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black"></div>
              <div className="w-[16px] h-[2px] absolute bottom-[12px] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black"></div>
            </Link>
          )}

          {props.showSidebar && (
            <div className="h-10 w-10 bg-background rounded opacity-0"></div>
          )}

          <Link href="/" className="w-fit h-fit hidden md:block">
            <Button className="">Place a Request</Button>
          </Link>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export default Navbar;
