"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import Button from "./ui/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Dialog from "./ui/DialogPrimitive";
import RequestForm from "./RequestForm";
import { useSidebarContext } from "@/app/context/sidebarContext";

const Searchbox = React.lazy(() => import("./Searchbox"));
const HamburgerMenu = React.lazy(() => import("@mui/icons-material/Menu"));
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NotificationsIcon = React.lazy(
  () => import("@mui/icons-material/Notifications")
);

type Props = {};

const onlyRenderLogo = ["login", "signup", "onboard"];

export default function Navbar({}: Props) {
  const path = usePathname();
  const { showSidebar, setShowSidebar } = useSidebarContext();
  const pathUrl = path.split("/")[1];
  let renderOnlyLogo = Boolean(
    onlyRenderLogo.find((urlSplit) => urlSplit === pathUrl)
  );

  return (
    <nav
      className={cn(
        "p-4 md:px-[100px] sticky top-0 flex justify-between md:grid grid-cols-3 bg-white items-center z-30"
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

      {pathUrl === "onboard" ? (
        <div className="font-headline text-headline_3 md:text-headline_2 font-bold text-[#168F0B]">
          Sign up Successful!
        </div>
      ) : null}

      {renderOnlyLogo ? null : (
        <>
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
                {!showSidebar && (
                  <HamburgerMenu
                    className={cn("text-stroke")}
                    onClick={() => setShowSidebar(!showSidebar)}
                  />
                )}

                <div
                  className={cn("h-10 w-10", !showSidebar && "hidden")}
                ></div>
              </div>
            </React.Suspense>

            <Dialog
              dialogTrigger={
                <Button className={cn("w-fit h-fit hidden md:block")}>
                  Place a Request
                </Button>
              }
              className="fixed -translate-x-1/2 z-30 top-[86px] left-1/2"
            >
              <RequestForm />
            </Dialog>
          </div>
        </>
      )}
    </nav>
  );
}
