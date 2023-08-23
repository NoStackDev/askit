"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import Button from "./ui/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Dialog from "./ui/DialogPrimitive";
import RequestForm from "./RequestForm";
import { useSidebarContext } from "@/app/context/sidebarContext";
import { useAuthContext } from "@/app/context/authContext";

const Searchbox = React.lazy(() => import("./Searchbox"));
const HamburgerMenu = React.lazy(() => import("@mui/icons-material/Menu"));
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NotificationsIcon = React.lazy(
  () => import("@mui/icons-material/Notifications")
);

type Props = {};

const onlyRenderLogo = ["login", "signup", "onboard", "recoverpassword"];

export default function Navbar({}: Props) {
  const path = usePathname();
  const { showSidebar, setShowSidebar } = useSidebarContext();
  const { isOnboarding } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const userDetails = window.localStorage.getItem("userDetails");
    if (userDetails) {
      setIsLoggedIn(true);
    }
  });

  const pathUrl = path.split("/");
  let renderOnlyLogo = Boolean(
    onlyRenderLogo.find((urlSplit) => urlSplit === pathUrl[1])
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

      {isOnboarding && (
        <div className="font-headline text-headline_3 md:text-headline_2 font-bold text-[#168F0B]">
          Sign up Successful!
        </div>
      )}

      {renderOnlyLogo ? null : (
        <>
          <Searchbox className="hidden md:block w-full row-start-2 col-span-3 md:row-start-1 md:col-start-2 md:col-span-1" />

          <div className="flex items-center gap-6 justify-end">
            {isLoggedIn ? (
              <div className="h-fit w-fit flex items-center gap-6 justify-end">
                <Link href="/notification" className="inline-flex rounded">
                  <React.Suspense
                    fallback={
                      <div className="h-10 w-10 bg-background rounded animate-pulse"></div>
                    }
                  >
                    <div
                      className={cn(
                        "h-10 w-10 bg-background rounded flex items-center justify-center",
                        pathUrl[1] === "notification" &&
                          "border border-secondary"
                      )}
                    >
                      <NotificationsIcon
                        className={cn(
                          "text-stroke",
                          pathUrl[1] === "notification" && "text-secondary"
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
                        pathUrl[1] === "profile" &&
                          pathUrl.length < 3 &&
                          "border border-secondary"
                      )}
                    >
                      <PersonIcon
                        className={cn(
                          "text-stroke",
                          pathUrl[1] === "profile" &&
                            pathUrl.length < 3 &&
                            "text-secondary"
                        )}
                      />
                    </div>
                  </React.Suspense>
                </Link>
              </div>
            ) : (
              <Link href={"/login"} className="">
                <button className="font-body text-title_1 font-medium text-[#6356E5] py-[5px] px-4 hover:cursor-pointer hover:bg-grey/20 rounded-md">
                  Login
                </button>
              </Link>
            )}

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
              className="fixed -translate-x-1/2 z-50 top-1/2 -translate-y-1/2 left-1/2"
            >
              <RequestForm />
            </Dialog>
          </div>
        </>
      )}
    </nav>
  );
}
