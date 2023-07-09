"use client";

import { useGlobalContext } from "@/app/context/Store";
import { useAuthContext } from "@/app/context/authContext";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ArrowCircleLeftIcon = React.lazy(
  () => import("@mui/icons-material/ArrowCircleLeft")
);

const Topbar = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOnboarding, dispatch } = useAuthContext();
  const { setUser: setAuthUser } = useGlobalContext();
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const onClickSkip = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setAuthUser(null);
    window.location.href = "/";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-[#070237] w-full bg-[url(../../public/images/pictures/topbarbg1.png)] flex items-center justify-center px-[22px] py-[18px] bg-no-repeat bg-cover",
        isOnboarding && "justify-start md:justify-center",
        className
      )}
      {...props}
    >
      {isOnboarding ? null : (
        <Link
          href="/"
          className="absolute left-[55px] -translate-x-1/2 top-1/2 -translate-y-1/2 w-fit h-fit flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          <React.Suspense>
            <ArrowCircleLeftIcon className="text-white" />
          </React.Suspense>
          <div className="font-body text-title_3 font-medium text-white">
            Back
          </div>
        </Link>
      )}

      <div
        className={cn(
          "font-headline text-headline_2 justify-self-center font-bold text-white"
        )}
      >
        {children}
      </div>

      {isOnboarding ? (
        <Link
          href="/login"
          className="absolute right-[0px] -translate-x-1/2 top-1/2 -translate-y-1/2 w-fit h-fit flex items-center gap-1"
          onClick={(e) => onClickSkip(e)}
          ref={linkRef}
        >
          <div className="font-body text-title_2 font-medium text-primary bg-white rounded-lg py-1 px-3">
            Skip
          </div>
        </Link>
      ) : null}
    </div>
  );
});

Topbar.displayName = "Topbar";

export default Topbar;
