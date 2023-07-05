import { cn, month } from "@/app/lib/utils";
import { RequestType } from "@/app/types";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

const CommentsIcon = React.lazy(() => import("@mui/icons-material/Quickreply"));
const WatchLaterIcon = React.lazy(
  () => import("@mui/icons-material/WatchLater")
);
const LocationOnIcon = React.lazy(
  () => import("@mui/icons-material/LocationOn")
);
const BookmarkBorderIcon = React.lazy(
  () => import("@mui/icons-material/BookmarkBorder")
);
const BookmarkIcon = React.lazy(() => import("@mui/icons-material/Bookmark"));

interface Props extends HTMLAttributes<HTMLDivElement> {}

const RequestCard = React.forwardRef<
  React.ElementRef<"div">,
  Props & Omit<RequestType, "id"> & {requestId: number}
>(
  (
    {
      children,
      className,
      image_url,
      description,
      created_at,
      location,
      bookmark,
      requestId,
      ...props
    },
    ref
  ) => {
    const date = new Date(created_at);

    return (
      <div
        ref={ref}
        className={cn(
          "border-[1px] border-stroke rounded-[20px] shadow-boxShadow_1 p-4 hover:cursor-pointer hover:border-black hover:scale-[1.01] transition-transform duration-100 h-fit",
          className
        )}
        {...props}
      >
        <div className="border-b-[1px] border-[#EDECF0] flex gap-2 pb-3">
          {image_url && (
            <Image
              src={image_url}
              alt="product"
              height={110}
              width={110}
              className="h-[110px] w-[110px]"
            />
          )}
          <div className="text-title_1 font-body font-medium text-[#010E1E] text-ellipsis overflow-hidden h-[144px]">
            {title}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div className="flex gap-3">
            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <CommentsIcon className="text-secondary" fontSize="small" />
                <span className="text-secondary font-body font-medium text-title_3">
                  16
                </span>
              </div>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <WatchLaterIcon className="text-[#ADABAB]" fontSize="small" />
                <span className="text-[#000000]/60 font-body text-special">
                  {date.getDay()} {month(date.getMonth())}
                </span>
              </div>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <LocationOnIcon className="text-[#ADABAB]" fontSize="small" />
                <span className="text-[#000000]/60 font-body text-special">
                  {location}
                </span>
              </div>
            </React.Suspense>
          </div>

          <React.Suspense
            fallback={
              <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
            }
          >
            {bookmark ? (
              <BookmarkIcon className="text-primary" />
            ) : (
              <BookmarkBorderIcon className="text-primary" />
            )}
          </React.Suspense>
        </div>
      </div>
    );
  }
);

RequestCard.displayName = "RequestCard";

export default RequestCard;

