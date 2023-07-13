"use client";

import { cn } from "@/app/lib/utils";
import { FeedsLinks, FeedsMeta, FeedsResponse } from "@/app/types";
import clsx from "clsx";
import React from "react";

const PageNumbers = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> &
    FeedsMeta &
    FeedsLinks & {
      setFeeds: React.Dispatch<React.SetStateAction<FeedsResponse | null>>;
      setIsError: React.Dispatch<React.SetStateAction<boolean>>;
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }
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
      setFeeds,
      setIsLoading,
      setIsError,
      ...prop
    },
    forwardRef
  ) => {
    const [pagesArr, setPagesArr] = React.useState<number[]>([]);
    React.useEffect(() => {
      const _pagesArr: number[] = [];

      for (let _ = 1; _ <= lastPageMeta; _++) {
        _pagesArr.push(_);
      }
      setPagesArr(_pagesArr);
    }, [lastPageMeta]);

    const onClickBtn = async (pageNumber: number) => {
      const pageLink =
        firstPageLink?.split(":").join("s:").split("=")[0] + "=" + pageNumber;
      setIsError(false);
      setIsLoading(true);
      const token = window.localStorage.getItem("token");
      window.scrollTo({ top: 200, behavior: "smooth" });

      try {
        const feedsResponse = await fetch(pageLink, {
          method: "OPTIONS",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (feedsResponse.status === 200) {
          setIsLoading(false);
          const data = await feedsResponse.json();
          // console.log(data);
          setFeeds(data);
          // window.scrollY = 100;
        } else throw new Error("failed to fetch next page");
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    };

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
              key={pageNumber}
              onClick={() => onClickBtn(pageNumber)}
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
