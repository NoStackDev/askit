"use client";

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
    Omit<RequestType, "id"> & { requestId: string }
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
      ...props
    },
    ref
  ) => {
    const date = new Date(created_at);

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#ffffff] pb-2 px-[20px] md:pl-0 md:pr-[20px] flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-[20px]",
          className
        )}
        {...props}
      >
        {image_url && (
          <Image
            src={`https://${image_url}`}
            height={255}
            width={255}
            alt="requested product image"
            className="w-[235px] h:auto md:w-[255px]"
          />
        )}

        <div>
          <div className="mt-4">
            <div className="font-body text-title_1 font-medium text-left">
              {title}
            </div>

            <div className="mt-[19px] md:mt-3 flex items-center gap-4">
              <div className="flex gap-1 items-center">
                <div className="font-body text-special text-[#000000] font-light h-full">
                  Location needed:
                </div>
                <div className="font-body text-special text-[#000000] font-medium">
                  {location}
                </div>
              </div>

              <div>
                <React.Suspense
                  fallback={
                    <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
                  }
                >
                  <div className="flex items-center gap-1">
                    <WatchLaterIcon
                      className="text-[#ADABAB]"
                      fontSize="small"
                    />
                    <span className="text-[#000000]/60 font-body text-special">
                      {date.getDay()} {month(date.getMonth())}
                    </span>
                  </div>
                </React.Suspense>
              </div>
            </div>

            <div className="mt-6 md:mt-4 flex flex-col gap-2">
              <div className="font-body text-title_3 text-secondary font-medium">
                More details
              </div>
              <div className="font-body text-body_1">{description}</div>
            </div>

            <div className="mt-7 md:mt-11 flex items-center justify-between md:gap-10">
              <div className="flex items-center gap-1">
                <React.Suspense
                  fallback={
                    <div className="w-[18px] h-3 bg-stroke/80 animate-pulse"></div>
                  }
                >
                  <VisibilityIcon className="text-stroke" />
                </React.Suspense>
                <div className="text-special font-body font-light text-[#000000]">
                  200 views
                </div>
              </div>

              <div className="flex gap-3 md:gap-10 items-center">
                <div className="flex items-center gap-1 hover:cursor-pointer">
                  <React.Suspense
                    fallback={
                      <div className="w-[18px] h-4 bg-stroke/80 animate-pulse"></div>
                    }
                  >
                    <FlagIcon className="text-black" />
                  </React.Suspense>
                  <div className="text-title_3 font-body font-medium text-black">
                    Report
                  </div>
                </div>

                <div className="flex items-center gap-1 hover:cursor-pointer">
                  <React.Suspense
                    fallback={
                      <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
                    }
                  >
                    {bookmark ? (
                      <BookmarkIcon className="text-[#000000]" />
                    ) : (
                      <BookmarkBorderIcon className="text-[#000000]" />
                    )}
                  </React.Suspense>
                  <div className="text-title_3 font-body font-medium text-black">
                    Save
                  </div>
                </div>

                <div className="flex items-center gap-1 hover:cursor-pointer">
                  <React.Suspense
                    fallback={
                      <div className="w-[18px] h-5 bg-stroke/80 animate-pulse"></div>
                    }
                  >
                    <ShareIcon className="text-black" />
                  </React.Suspense>
                  <div className="text-title_3 font-body font-medium text-black">
                    Share
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RequestImgDetail.displayName = "RequestImgDetail";

export default RequestImgDetail;
