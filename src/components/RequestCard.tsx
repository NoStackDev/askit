import { useFeedsContext } from "@/app/context/feedsContext";
import { useRequestContext } from "@/app/context/requestContext";
import { addDeleteBookmark } from "@/app/lib/bookmark";
import { deleteRequest } from "@/app/lib/request";
import { cn, month } from "@/app/lib/utils";
import { RequestType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import Dialog from "./ui/DialogPrimitive";
import DeleteConfirmation from "./DeleteConfirmation";
import Button from "./ui/Button";
import { DialogClose } from "@radix-ui/react-dialog";

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
  Props &
    Omit<RequestType, "id"> & {
      requestId: number;
      variant?: "user";
      requestType?: "SAVEDREQUESTPAGE";
    }
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
      num_of_views,
      num_of_responses,
      variant,
      requestType,
      user_id,
      ...props
    },
    ref
  ) => {
    const date = new Date(created_at);
    const { feeds, setFeeds } = useFeedsContext();
    const { requests, setRequests } = useRequestContext();
    const [bookmarked, setBookmarked] = React.useState(false);
    const [showBookmarker, setShowBookmarker] = React.useState(false);

    React.useEffect(() => {
      const userDetails = window.localStorage.getItem("userDetails");

      if (
        !userDetails ||
        (userDetails && JSON.parse(userDetails).data.id !== Number(user_id))
      ) {
        setShowBookmarker(true);
      }
    }, []);

    React.useEffect(() => {
      setBookmarked(bookmark);
    }, [bookmark]);

    const onBookmarkClick = async (
      event: React.MouseEvent<SVGSVGElement, MouseEvent>,
      requestId: number
    ) => {
      event.stopPropagation();
      const prevBookmarked = bookmarked;

      try {
        const token = window.localStorage.getItem("token");
        const userDetails = window.localStorage.getItem("userDetails");
        if (token && userDetails) {
          if (requestType === "SAVEDREQUESTPAGE") {
            const newRequests = requests?.filter(
              (request) => request.id !== requestId
            );
            if (requests && newRequests) {
              setRequests(newRequests);
            }
          } else {
            setBookmarked(!bookmarked);
          }

          const userId = JSON.parse(userDetails).data.id;
          const res = await addDeleteBookmark(token, {
            user_id: userId as number,
            req_id: requestId,
          });

          if (res.success) {
            return;
          }

          if (!res.success) {
            if (requestType === "SAVEDREQUESTPAGE") {
              setRequests(requests);
            }
          } else {
            setBookmarked(!bookmarked);
          }
        } else window.location.assign("/login");
      } catch (err) {
        console.log(err);
        const failedRequests = feeds?.data.map((request) => {
          if (request.id === Number(requestId)) {
            return {
              ...request,
              bookmark: !request.bookmark,
            };
          }
          return request;
        });
        setBookmarked(!bookmarked);
      }
    };

    const onClickDeleteBtn = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      requestId: number
    ) => {
      event.preventDefault();
      event.stopPropagation();
      let requestIndex: null | number = null;
      let deletedRequest: RequestType | null = null;
      const newRequests = requests?.filter((request, index) => {
        if (request.id === Number(requestId)) {
          requestIndex = index;
          deletedRequest = request;
        }
        return request.id !== Number(requestId);
      });

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
          const res = await deleteRequest(token, requestId);

          if (res.success) {
            return;
          } else {
            if (requests && requestIndex && deletedRequest)
              setRequests(requests);
          }
        } else window.location.assign("/login");
      } catch (err) {
        console.log(err);
        if (requests && requestIndex && deletedRequest) setRequests(requests);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-between border-[1px] border-stroke rounded-[20px] shadow-boxShadow_1 hover:border-black hover:scale-[1.01] transition-transform duration-100 h-[230px]",
          !image_url && "justify-normal",
          className
        )}
        {...props}
        onClick={() => window.location.assign(`/requests/${requestId}`)}
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
          <div
            className={cn(
              "text-[#010E1E] text-[23px] font-bold text-ellipsis overflow-hidden max-h-[144px]",
              !image_url &&
                "w-full text-center h-[200px] flex items-center justify-center font-bold"
            )}
          >
            {title}
          </div>
        </div>

        <div
          className={cn(
            "flex justify-between py-4 px-4 border-t-[1px] border-[#EDECF0] mt-2"
          )}
        >
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
                  {date.getDate()} {month(date.getMonth())}
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
            {variant === "user" && (
              <Dialog
                dialogTrigger={
                  <Image
                    src="/images/icons/deleteIcon.png"
                    height={18}
                    width={18}
                    alt="delete"
                    className="hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                }
                className="fixed -translate-x-1/2 z-50 top-1/2 -translate-y-1/2 left-1/2"
              >
                <DeleteConfirmation
                  closeDialogElement={
                    <div className="flex flex-col gap-6 items-center">
                      <DialogClose asChild>
                        <Button
                          variant={"outlined2"}
                          className="px-[72px] py-3 border-black text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          No
                        </Button>
                      </DialogClose>

                      <DialogClose asChild>
                        <Button
                          variant={"outlined2"}
                          className="px-[72px] py-3 border-black text-black"
                          onClick={(e) => onClickDeleteBtn(e, requestId)}
                        >
                          Yes delete!
                        </Button>
                      </DialogClose>
                    </div>
                  }
                />
              </Dialog>
            )}

            {showBookmarker && (
              <>
                {bookmarked ? (
                  <BookmarkIcon
                    className="text-primary hover:cursor-pointer"
                    onClick={(e) => onBookmarkClick(e, requestId)}
                  />
                ) : (
                  <BookmarkBorderIcon
                    className="text-primary hover:cursor-pointer"
                    onClick={(e) => onBookmarkClick(e, requestId)}
                  />
                )}
              </>
            )}
          </React.Suspense>
        </div>
      </div>
    );
  }
);

RequestCard.displayName = "RequestCard";

export default RequestCard;
