"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const ArrowCircleLeftIcon = React.lazy(
  () => import("@mui/icons-material/ArrowCircleLeft")
);

const Topbar = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> 
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-[#070237] w-full bg-[url(../../public/images/pictures/topbarbg1.png)] flex items-center justify-center px-[22px] py-[18px] bg-no-repeat bg-cover",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="absolute left-[55px] -translate-x-1/2 top-1/2 -translate-y-1/2 w-fit h-fit flex items-center gap-1"
      >
        <React.Suspense>
          <ArrowCircleLeftIcon className="text-white" />
        </React.Suspense>
        <div className="font-body text-title_3 font-medium text-white">
          Back
        </div>
      </Link>

      <div
        className={cn(
          "font-headline text-headline_2 md:text-headline_2 justify-self-center font-bold text-white"
        )}
      >
        {children}
      </div>
    </div>
  );
});

Topbar.displayName = "Topbar";

export default Topbar;
