"use client";

import { useFeedsContext } from "@/app/context/feedsContext";
import { getRequests, searchRequests } from "@/app/lib/request";
import { cn } from "@/app/lib/utils";
import React, { HTMLAttributes } from "react";

const SearchIcon = React.lazy(() => import("@mui/icons-material/Search"));

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Searchbox = React.forwardRef<React.ElementRef<"div">, Props>(
  ({ className, ...props }, ref) => {
    const [searchText, setSearchText] = React.useState("");
    const { currentFeedsUrl, setCurrentFeedsUrl, setFeeds } = useFeedsContext();

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (event.target.value.trim() !== "") {
          const searchRes = await searchRequests(
            event.target.value.trim(),
            setCurrentFeedsUrl
          );
          setFeeds(searchRes);
        } else {
          const feedsRes = await getRequests(currentFeedsUrl);
          setFeeds(feedsRes);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className={cn("relative h-fit", className)} ref={ref}>
        <input
          type="text"
          placeholder="Search"
          className="py-2 pr-8 pl-3 bg-background w-full border-[1px] border-stroke rounded-[14px] placeholder:font-body placeholder:text-body_1 placeholder:font-normal placeholder:text-stroke font-body text-body_1 text-stroke"
          onChange={onChange}
        />

        <React.Suspense
          fallback={
            <div className="absolute top-1/2 -translate-y-1/2 right-2 h-4 w-4 bg-stroke/80"></div>
          }
        >
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-2 text-primary" />
        </React.Suspense>
      </div>
    );
  }
);

Searchbox.displayName = "Searchbox";

export default Searchbox;
