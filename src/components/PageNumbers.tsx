import { cn } from "@/app/lib/utils";
import clsx from "clsx";
import React from "react";

const PageNumbers = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    totalPages: number;
    currentPage: number;
  }
>(({ className, totalPages, currentPage, ...prop }, forwardRef) => {
  return (
    <div
      ref={forwardRef}
      className={cn("flex items-center justify-center gap-6", className)}
      {...prop}
    >
      <div
        className={clsx(
          "px-2 py-[2px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer",
          currentPage === 1
            ? "bg-secondary text-white"
            : "bg-white text-[#000000]"
        )}
      >
        1
      </div>
      <div
        className={clsx(
          "px-2 py-[2px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer",
          currentPage === 2
            ? "bg-secondary text-white"
            : "bg-white text-[#000000]"
        )}
      >
        2
      </div>
      <div
        className={clsx(
          "px-2 py-[2px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer",
          currentPage === 3
            ? "bg-secondary text-white"
            : "bg-white text-[#000000]"
        )}
      >
        3
      </div>
    </div>
  );
});

PageNumbers.displayName = "Pageumber";

export default PageNumbers;
