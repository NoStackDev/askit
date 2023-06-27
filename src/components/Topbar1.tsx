"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ArrowCircleLeftIcon = React.lazy(
  () => import("@mui/icons-material/ArrowCircleLeft")
);

const Topbar1 = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & {
    leftComponent?: React.ReactNode;
    middleComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
  }
>(
  (
    {
      className,
      children,
      leftComponent,
      middleComponent,
      rightComponent,
      ...props
    },
    ref
  ) => {
    const path = usePathname();
    const pathUrl = path.split("/")[1];
    let renderSkipButton = Boolean(pathUrl === "onboard");

    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-[#070237] w-full bg-[url(../../public/images/pictures/topbarbg1.png)] grid grid-cols-[1fr_3fr_1fr] items-center bg-no-repeat bg-cover",
          pathUrl === "onboard" && "justify-start md:justify-center",
          className
        )}
        {...props}
      >
        {leftComponent}
        {middleComponent}
        {rightComponent}
      </div>
    );
  }
);

Topbar1.displayName = "Topbar1";

export default Topbar1;
