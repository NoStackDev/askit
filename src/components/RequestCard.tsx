import { useRequestContext } from "@/app/context/requestContext";
import { addToBookmark, deleteBookmark } from "@/app/lib/bookmark";
import { cn, month } from "@/app/lib/utils";
import { RequestType } from "@/app/types";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
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
  Props & Omit<RequestType, "id"> & { requestId: number; variant?: "user" }
>(
  (
    {
      children,
      className,
      title,
      image_url,
      description,
      created_at,
      location,
      bookmark,
      requestId,
      num_of_responses,
      variant,
      ...props
    },
    ref
  ) => {
    const date = new Date(created_at);
    const { requests, setRequests } = useRequestContext();

    const onBookmarkClick = async (
      event: React.MouseEvent<SVGSVGElement, MouseEvent>,
      requestId: number,
      bookmark: boolean
    ) => {
      event.stopPropagation();

      try {
        const token = window.localStorage.getItem("token");
        const userDetails = window.localStorage.getItem("userDetails");
        if (token && userDetails) {
          const newRequests = requests?.map((request) => {
            if (request.id === Number(requestId)) {
              return {
                ...request,
                bookmark: !bookmark,
              };
            }
            return request;
          });
          setRequests(newRequests || null);

          const userId = JSON.parse(userDetails).data.id;
          const res = !bookmark
            ? await addToBookmark(token, {
                user_id: userId as number,
                req_id: requestId,
              })
            : await deleteBookmark(token, {
                user_id: userId as number,
                req_id: requestId,
              });

          if (res.success) {
            return;
          }
        } else window.location.href = "/login";
      } catch (err) {
        console.log(err);
        const failedRequests = requests?.map((request) => {
          if (request.id === Number(requestId)) {
            return {
              ...request,
              bookmark: !request.bookmark,
            };
          }
          return request;
        });
        setRequests(failedRequests || null);
      }
    };

    const onClickDeleteBtn = async (
      event: React.MouseEvent<HTMLImageElement, MouseEvent>,
      requestId: number
    ) => {
      event.stopPropagation();
      let requestIndex: null | number = null;
      let deletedRequest: RequestType | null = null;

      try {
        const token = window.localStorage.getItem("token");
        const userDetails = window.localStorage.getItem("userDetails");
        if (token && userDetails) {
          const newRequests = requests?.filter((request, index) => {
            if (request.id === Number(requestId)) {
              requestIndex = index;
              deletedRequest = request;
            }
            return request.id !== Number(requestId);
          });
          setRequests(newRequests || null);

          const userId = JSON.parse(userDetails).data.id;
          const res = await deleteBookmark(token, {
            user_id: userId as number,
            req_id: requestId,
          });

          if (res.success) {
            return;
          }
        } else window.location.href = "/login";
      } catch (err) {
        console.log(err);
        if (requests && requestIndex && deletedRequest)
          setRequests([
            ...requests.slice(0, requestIndex),
            deletedRequest,
            ...requests.slice(requestIndex),
          ]);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-between border-[1px] border-stroke rounded-[20px] shadow-boxShadow_1 hover:border-black hover:scale-[1.01] transition-transform duration-100 h-[230px]",
          className
        )}
        {...props}
        onClick={() => (window.location.href = `/requests/${requestId}`)}
      >
        <div className="flex gap-2 pb-3 px-2 py-4">
          {image_url && (
            <Image
              src={image_url && `https://${image_url}`}
              alt="product"
              height={140}
              width={140}
              className="h-[140px] w-[140px]"
            />
          )}
          <div className="text-title_2 font-body font-medium text-[#010E1E] text-ellipsis overflow-hidden max-h-[144px]">
            {title}
          </div>
        </div>

        <div className="flex justify-between py-4 px-4 border-t-[1px] border-[#EDECF0] mt-2">
          <div className="flex gap-3">
            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <CommentsIcon className="text-secondary" fontSize="small" />
                <span className="text-secondary font-body font-medium text-title_3">
                  {num_of_responses}
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
            {variant === "user" ? (
              <Image
                src="/images/icons/deleteIcon.png"
                height={18}
                width={16}
                alt="delete"
                className="hover:cursor-pointer"
                onClick={(e) => onClickDeleteBtn(e, requestId)}
              />
            ) : bookmark ? (
              <BookmarkIcon
                className="text-primary hover:cursor-pointer"
                onClick={(e) => onBookmarkClick(e, requestId, bookmark)}
              />
            ) : (
              <BookmarkBorderIcon
                className="text-primary hover:cursor-pointer"
                onClick={(e) => onBookmarkClick(e, requestId, bookmark)}
              />
            )}
          </React.Suspense>
        </div>
      </div>
    );
  }
);

RequestCard.displayName = "RequestCard";

export default RequestCard;
