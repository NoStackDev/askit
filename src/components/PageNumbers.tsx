import { cn } from "@/app/lib/utils";
import { FeedsLinks, FeedsMeta } from "@/app/types";
import clsx from "clsx";
import React from "react";

const PageNumbers = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & FeedsMeta & FeedsLinks
>(
  (
    {
      className,
      first: firstPageLink,
      last: lastPageLink,
      prev: prevPageLink,
      next: nextPageLink,
      current_page: currentPageMeta,
      from: fromMeta,
      last_page: lastPageMeta,
      links: linksMeta,
      ...prop
    },
    forwardRef
  ) => {
    const pagesArr: number[] = [];

    React.useEffect(() => {
      for (let _ = 1; _ <= lastPageMeta; _++) {
        pagesArr.push(_);
      }
    }, [lastPageMeta]);

    return (
      <div
        ref={forwardRef}
        className={cn("flex items-center justify-center gap-6", className)}
        {...prop}
      >
        {pagesArr.map((pageNumber) => {
          return (
            <div
              className={cn(
                "px-2 py-[2px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer bg-white text-[#000000]",
                currentPageMeta === pageNumber && "bg-secondary text-white"
              )}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>
    );
  }
);

PageNumbers.displayName = "Pageumber";

export default PageNumbers;
