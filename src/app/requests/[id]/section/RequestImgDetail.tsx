"use client";

import { addDeleteBookmark, getBookmarks } from "@/app/lib/bookmark";
import { deleteRequest } from "@/app/lib/request";
import { cn, month } from "@/app/lib/utils";
import { RequestDetailType, RequestType } from "@/app/types";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import ReportUserCard from "@/components/ReportUserCard";
import RequestForm from "@/components/RequestForm/RequestForm";
import Share from "@/components/Share";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/DialogPrimitive";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
      user_id,
      ...props
    },
    ref
  ) => {
    const [bookmarked, setBookmarked] = React.useState(false);
    const [showDeleteEdit, setShowDeleteEdit] = React.useState(false);
    const [showReportSave, setShowReportSave] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
      const userDetails = window.localStorage.getItem("userDetails");

      if (userDetails && JSON.parse(userDetails).data.id === Number(user_id)) {
        setShowDeleteEdit(true);
      }

      if (userDetails && JSON.parse(userDetails).data.id !== Number(user_id)) {
        setShowReportSave(true);
      }
    }, []);

    const date = new Date(created_at);

    React.useEffect(() => {
      const token = window.localStorage.getItem("token");
      (async () => {
        if (token) {
          const bookmarksRes: { data: RequestType[] } = await getBookmarks(
            token
          );

          if (!bookmarksRes) {
            console.log(bookmarksRes);
            return;
          }
          if (
            bookmarksRes.data.find(
              (requestItem) => requestItem.id === requestid
            )
          ) {
            setBookmarked(true);
          }
        }
      })();
    }, []);

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

    const onClickDeleteBtn = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      requestId: number
    ) => {
      event.preventDefault();
      event.stopPropagation();

      const token = window.localStorage.getItem("token");
      const userDetails = window.localStorage.getItem("userDetails");

      try {
        const token = window.localStorage.getItem("token");
        const userDetails = window.localStorage.getItem("userDetails");
        if (token && userDetails) {
          const userId = JSON.parse(userDetails).data.id;
          const res = await deleteRequest(token, requestId);

          if (res.success) {
            router.back();
            return;
          } else {
            return;
          }
        } else window.location.assign("/login");
      } catch (err) {
        console.log(err);
      }
    };

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
          <div className="font-body font-bold text-[46px] text-[#010E1E] mt-4">
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
                  {date.getDate()} {month(date.getMonth())}
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
                      {date.getDate()} {month(date.getMonth())}
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
                  {num_of_views} view{num_of_views === 1 ? null : "s"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="h-[2px] w-full bg-grey/20"></div>

        {/* delete report edit save share  */}
        <div className="w-full flex items-center justify-between px-5 pt-5 pb-6">
          {showDeleteEdit && (
            <Dialog
              dialogTrigger={
                <div className="flex gap-1 justify-between items-center hover:cursor-pointer">
                  <Image
                    src="/images/icons/deleteIcon.png"
                    height={18}
                    width={18}
                    alt="delete"
                    className="hover:cursor-pointer opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />

                  <span className="font-body text-black/60 text-body_2">
                    Delete
                  </span>
                </div>
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
                        onClick={(e) => onClickDeleteBtn(e, requestid)}
                      >
                        Yes delete!
                      </Button>
                    </DialogClose>
                  </div>
                }
              />
            </Dialog>
          )}

          {showReportSave && (
            <Dialog
              dialogTrigger={
                <div className="flex items-center gap-1 hover:cursor-pointer">
                  <Image
                    src={"/images/icons/reportIcon.png"}
                    width={24}
                    height={24}
                    alt="report"
                  />
                  <div className="text-title_3 font-body text-black/60">
                    Report
                  </div>
                </div>
              }
              className="top-0 fixed left-0 h-full md:h-fit md:-translate-x-1/2 z-50 md:top-1/2 md:-translate-y-1/2 md:left-1/2"
            >
              <ReportUserCard />
            </Dialog>
          )}

          {showDeleteEdit && (
            <Dialog
              dialogTrigger={
                <div className="flex gap-1 justify-between items-center hover:cursor-pointer">
                  <Image
                    src="/images/icons/editIcon.png"
                    width={24}
                    height={24}
                    alt="edit"
                    className="hover:cursor-pointer"
                  />

                  <span className="font-body text-black/60 text-body_2">
                    Edit
                  </span>
                </div>
              }
              className="top-0 fixed left-0 h-full md:h-fit md:-translate-x-1/2 z-50 md:top-1/2 md:-translate-y-1/2 md:left-1/2"
            >
              <RequestForm
                prefill={{
                  title: title,
                  description: description,
                  id: requestid,
                }}
              />
            </Dialog>
          )}

          {showReportSave && (
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
          )}

          <Share shareText={title}>
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
          </Share>
        </div>
      </div>
    );
  }
);

RequestImgDetail.displayName = "RequestImgDetail";

export default RequestImgDetail;
