"use client";

import Link from "next/link";
import React, { HTMLAttributes } from "react";
import Searchbox from "./Searchbox";
import Button from "./ui/Button";
import { cn } from "@/lib/utils";

const HamburgerMenu = React.lazy(() => import("@mui/icons-material/Menu"));
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NotificationsIcon = React.lazy(
  () => import("@mui/icons-material/Notifications")
);

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
          props.showSidebar && "z-0",
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
          <Link href="/" className="inline-flex rounded">
            <React.Suspense
              fallback={
                <div className="h-10 w-10 bg-background rounded animate-pulse"></div>
              }
            >
              <div
                className={cn(
                  "h-10 w-10 bg-background rounded flex items-center justify-center"
                )}
              >
                <NotificationsIcon className="text-stroke" />
              </div>
            </React.Suspense>
          </Link>

          <Link href="/" className="inline-flex rounded">
            <React.Suspense
              fallback={
                <div className="h-10 w-10 bg-background rounded animate-pulse"></div>
              }
            >
              <div
                className={cn(
                  "h-10 w-10 bg-background rounded flex items-center justify-center"
                )}
              >
                <PersonIcon className="text-stroke" />
              </div>
            </React.Suspense>
          </Link>

          <React.Suspense
            fallback={
              <div className="h-10 w-10 bg-background rounded animate-pulse"></div>
            }
          >
            <div
              className={cn(
                "md:hidden h-10 w-10 bg-background rounded flex items-center justify-center"
              )}
              onClick={props.handleSidebar}
            >
              <HamburgerMenu className="text-stroke" />
            </div>
          </React.Suspense>

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
