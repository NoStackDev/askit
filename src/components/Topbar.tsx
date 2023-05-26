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
        "bg-[#070237] w-full bg-[url(../../public/images/pictures/topbarbg1.png)] grid grid-cols-3 items-center px-[22px] py-[18px] bg-no-repeat bg-cover",
        className
      )}
      {...props}
    >
      <Link href="/" className="w-fit h-fit flex items-center gap-1">
        <React.Suspense>
          <ArrowCircleLeftIcon className="text-white" />
        </React.Suspense>
        <div className="font-body text-title_3 font-medium text-white">Back</div>
      </Link>

      <div className="font-headline text-headline_2 md:text-headline_1 justify-self-center font-bold text-white">
        {children}
      </div>
    </div>
  );
});

Topbar.displayName = "Topbar";

export default Topbar;
