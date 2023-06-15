import { cn } from "@/lib/utils";
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  image?: boolean;
  description: string;
  commentCount: number;
  date: Date;
  location: string;
  bookmarked: boolean;
}

const RequestCard = React.forwardRef<React.ElementRef<"div">, Props>(
  (
    {
      children,
      className,
      image,
      description,
      commentCount,
      date,
      location,
      bookmarked,
      ...props
    },
    ref
  ) => {
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
          {image && (
            <Image
              src="/images/pictures/productImage.png"
              alt="product"
              height={110}
              width={110}
              className="h-[110px] w-[110px]"
            />
          )}
          <div className="text-title_1 font-body font-medium text-[#010E1E] text-ellipsis overflow-hidden h-[144px]">
            {description}
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
                <WatchLaterIcon className="text-[#ADABAB]" fontSize="small"/>
                <span className="text-[#000000]/60 font-body text-special">22 Apr</span>
              </div>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <LocationOnIcon className="text-[#ADABAB]" fontSize="small"/>
                <span className="text-[#000000]/60 font-body text-special">Port Harcourt</span>
              </div>
            </React.Suspense>
          </div>

          <React.Suspense
            fallback={
              <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
            }
          >
            {bookmarked ? (
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
