"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "./ui/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Searchbox = React.lazy(() => import("./Searchbox"));
const HamburgerMenu = React.lazy(() => import("@mui/icons-material/Menu"));
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NotificationsIcon = React.lazy(
  () => import("@mui/icons-material/Notifications")
);

type Props = {};

export default function Navbar({}: Props) {
  const path = usePathname();
  const pathUrl = path.split("/")[1];

  return (
    <nav
      className={cn(
        "p-4 md:px-[100px] flex justify-between md:grid grid-cols-3 bg-white items-center z-30"
      )}
    >
      <Link href="/" className="max-w-fit flex gap-2 items-center">
        <Image
          src="/images/pictures/logo.png"
          width={115}
          height={32}
          alt="logo"
        />
      </Link>

      <Searchbox className="hidden md:block w-full row-start-2 col-span-3 md:row-start-1 md:col-start-2 md:col-span-1" />

      <div className="flex items-center gap-6 justify-end">
        <Link href="/notification" className="inline-flex rounded">
          <React.Suspense
            fallback={
              <div className="h-10 w-10 bg-background rounded animate-pulse"></div>
            }
          >
            <div
              className={cn(
                "h-10 w-10 bg-background rounded flex items-center justify-center",
                pathUrl === "notification" && "border border-secondary"
              )}
            >
              <NotificationsIcon
                className={cn(
                  "text-stroke",
                  pathUrl === "notification" && "text-secondary"
                )}
              />
            </div>
          </React.Suspense>
        </Link>

        <Link href="/profile" className="inline-flex rounded">
          <React.Suspense
            fallback={
              <div className="h-10 w-10 bg-background rounded animate-pulse"></div>
            }
          >
            <div
              className={cn(
                "h-10 w-10 bg-background rounded flex items-center justify-center",
                pathUrl === "profile" && "border border-secondary"
              )}
            >
              <PersonIcon
                className={cn(
                  "text-stroke",
                  pathUrl === "profile" && "text-secondary"
                )}
              />
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
          >
            <HamburgerMenu className="text-stroke" />
          </div>
        </React.Suspense>

        <Link href="/request/" className="w-fit h-fit hidden md:block">
          <Button className="">Place a Request</Button>
        </Link>
      </div>
    </nav>
  );
}
