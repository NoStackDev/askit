"use client";

import { addDeleteBookmark } from "@/app/lib/bookmark";
import { cn, month } from "@/app/lib/utils";
import { RequestDetailType, RequestType } from "@/app/types";
import Image from "next/image";
import React from "react";

const WatchLaterIcon = React.lazy(
  () => import("@mui/icons-material/WatchLater")
);
const VisibilityIcon = React.lazy(
  () => import("@mui/icons-material/Visibility")
);
const FlagIcon = React.lazy(() => import("@mui/icons-material/Flag"));
const BookmarkBorderIcon = React.lazy(
  () => import("@mui/icons-material/BookmarkBorder")
);
const BookmarkIcon = React.lazy(() => import("@mui/icons-material/Bookmark"));
const ShareIcon = React.lazy(() => import("@mui/icons-material/Share"));

const RequestImgDetail = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> &
    Omit<RequestType, "id"> & { requestid: number }
>(
  (
    {
      className,
      children,
      image_url,
      bookmark,
      category,
      created_at,
      description,
      location,
      title,
      user,
      requestid,
      num_of_views,
      ...props
    },
    ref
  ) => {
    const [bookmarked, setBookmarked] = React.useState(false);
    const date = new Date(created_at);

    React.useEffect(() => {
      setBookmarked(bookmark);
    }, [bookmark]);

    const onBookmarkClick = async () => {
      const token = window.localStorage.getItem("token");
      const userDetails = window.localStorage.getItem("userDetails");
      const prevBookmarked = bookmarked;
      if (token && userDetails) {
        try {
          setBookmarked(!bookmarked);
          const userId = JSON.parse(userDetails).data.id;
          const bookemarkedRes = await addDeleteBookmark(token, {
            user_id: userId as number,
            req_id: requestid,
          });

          if (bookemarkedRes.success) {
            return;
          } else {
            setBookmarked(prevBookmarked);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    // console.log(bookmark)

    return (
      <div
        ref={ref}
        className={cn("bg-[#ffffff] w-full", className)}
        {...props}
      >
        <div className="px-5 pt-5 pb-6 flex flex-col items-start w-full">
          <div className="font-body text-[11px] text-[#000000]/60 font-normal">
            Category:{" "}
            <span className="font-body text-[11px] text-[#000000] font-medium">
              {category}
            </span>
          </div>
          {/* title */}
          <div className="font-body font-bold text-[23px] text-[#010E1E mt-4">
            {title}
          </div>

          {/* location and date */}
          <div className="hidden md:flex items-center w-full justify-between md:justify-start md:gap-6 mt-4 md:mt-2">
            <div className="w-fit flex items-center gap-2">
              <Image
                src={"/images/icons/locationIcon.png"}
                height={16}
                width={16}
                alt="location"
              />
              <div className="font-body font-normal text-[#000000] text-[11px]">
                {location}
              </div>
            </div>

            <React.Suspense
              fallback={
                <div className="w-10 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-2">
                <WatchLaterIcon className="text-[#ADABAB]" fontSize="small" />
                <span className="text-[#000000]/60 font-body text-[11px]">
                  {date.getDay()} {month(date.getMonth())}
                </span>
              </div>
            </React.Suspense>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-6 items-center mt-4">
            {/* request image  */}
            {image_url && (
              <Image
                src={`https://${image_url}`}
                height={255}
                width={255}
                alt="requested product image"
                className="w-full h-auto max-w-[380px] max-h-[380px] md:self-start"
              />
            )}

            <div className="w-full md:self-start gap-4">
              {/* location and date */}
              <div className="flex md:hidden items-center w-full justify-between md:justify-start md:gap-6">
                <div className="md:hidden w-fit flex items-center gap-2">
                  <Image
                    src={"/images/icons/locationIcon.png"}
                    height={16}
                    width={16}
                    alt="location"
                  />
                  <div className="md:hidden font-body font-normal text-[#000000] text-[11px]">
                    {location}
                  </div>
                </div>

                <React.Suspense
                  fallback={
                    <div className="w-10 h-4 bg-stroke/80 animate-pulse"></div>
                  }
                >
                  <div className="flex items-center gap-2">
                    <WatchLaterIcon
                      className="text-[#ADABAB]"
                      fontSize="small"
                    />
                    <span className="text-[#000000]/60 font-body text-[11px]">
                      {date.getDay()} {month(date.getMonth())}
                    </span>
                  </div>
                </React.Suspense>
              </div>

              {/* description */}
              {
                <div className="w-full mt-6 md:mt-0">
                  <div className="font-body text-title_3 font-medium text-secondary/70">
                    Description
                  </div>

                  {
                    <div className="font-body text-body_1 text-secondary w-full text-left">
                      {description}
                    </div>
                  }
                </div>
              }

              {/* views  */}
              <div className="flex items-center gap-2 mt-5 md:mt-4 self-start">
                <Image
                  src={"/images/icons/visibilityIcon.png"}
                  height={16}
                  width={16}
                  alt="number of views"
                />
                <div className="text-special font-body font-light text-[#000000]/60">
                  {num_of_views} views
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="h-[2px] w-full bg-grey/20"></div>

        {/* report save share  */}
        <div className="w-full flex items-center justify-between px-5 pt-5 pb-6">
          <div className="flex items-center gap-1 hover:cursor-pointer">
            <Image
              src={"/images/icons/reportIcon.png"}
              width={24}
              height={24}
              alt="report"
            />
            <div className="text-title_3 font-body text-black/60">Report</div>
          </div>

          <div className="flex items-center gap-1 hover:cursor-pointer">
            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              {bookmarked ? (
                <BookmarkIcon
                  className="text-primary hover:cursor-pointer"
                  onClick={onBookmarkClick}
                />
              ) : (
                <BookmarkBorderIcon
                  className="text-primary hover:cursor-pointer"
                  onClick={onBookmarkClick}
                />
              )}
            </React.Suspense>
            <div className="text-title_3 font-body text-black/60">Save</div>
          </div>

          <div className="flex items-center gap-1 hover:cursor-pointer">
            <React.Suspense
              fallback={
                <div className="w-[18px] h-5 bg-stroke/80 animate-pulse"></div>
              }
            >
              <ShareIcon className="text-black/60" />
            </React.Suspense>
            <div className="text-title_3 font-body text-black/60">Share</div>
          </div>
        </div>
      </div>
    );
  }
);

RequestImgDetail.displayName = "RequestImgDetail";

export default RequestImgDetail;
