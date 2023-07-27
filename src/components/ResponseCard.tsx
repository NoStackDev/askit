import { useResponseContext } from "@/app/context/responseContext";
import { deleteResponse } from "@/app/lib/repsonse";
import { cn, month } from "@/app/lib/utils";
import { RequestDetailResponseType, ResponseType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dialog from "./ui/DialogPrimitive";

const LocationOnIcon = React.lazy(
  () => import("@mui/icons-material/LocationOn")
);
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NorthEastIcon = React.lazy(() => import("@mui/icons-material/NorthEast"));
const DeleteIcon = React.lazy(() => import("@mui/icons-material/Delete"));

const ResponseCard = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> &
    Omit<RequestDetailResponseType, "id"> & {
      variant?: "user";
      responseid: number;
    }
>(
  (
    {
      children,
      className,
      created_at,
      description,
      responseid,
      image_url,
      location,
      title,
      user,
      user_id,
      price,
      variant,
      whatsapp_num,
      whatsapp_link,
      ...props
    },
    ref
  ) => {
    const { responses, setResponses } = useResponseContext();
    const date = new Date(created_at);

    const onClickDeleteBtn = async (
      event: React.MouseEvent<SVGSVGElement, MouseEvent>,
      responseid: number
    ) => {
      event.stopPropagation();
      let responseIndex: null | number = null;
      let deletedResponse: RequestDetailResponseType | null = null;
      const newResponse = responses?.filter((response, index) => {
        if (response.id === Number(responseid)) {
          responseIndex = index;
          deletedResponse = response;
        }
        return response.id !== Number(responseid);
      });

      try {
        const token = window.localStorage.getItem("token");
        const userDetails = window.localStorage.getItem("userDetails");
        if (token && userDetails) {
          const newRequests = responses?.filter((response, index) => {
            if (response.id === Number(responseid)) {
              responseIndex = index;
              deletedResponse = response;
            }
            return response.id !== Number(responseid);
          });
          setResponses(newRequests || null);

          const userId = JSON.parse(userDetails).data.id;
          const res = await deleteResponse(token, responseid);

          if (res.success) {
            console.log(res);
            return;
          } else {
            if (responses && responseIndex && deletedResponse)
              setResponses(responses);
            console.log(responses);
          }
        } else window.location.assign("/login");
      } catch (err) {
        console.log(err);
        if (responses && responseIndex && deletedResponse)
          setResponses(responses);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "p-4 bg-secondary rounded-[20px] h-fit min-w-[300px]",
          variant === "user" && "bg-[#191A23]",
          className
        )}
        {...props}
      >
        <div className="flex gap-3 items-start">
          {image_url && (
            <Link href={`/profile/${user_id}/`}>
              <Image
                src={`https://${image_url}`}
                width={92}
                height={92}
                alt={`product image`}
              />
            </Link>
          )}

          <div
            className={cn(
              "font-body text-white text-title_3 font-medium",
              !image_url && "text-white text-center w-full"
            )}
          >
            {description}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <React.Suspense
              fallback={
                <div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>
              }
            >
              <div className="flex items-center gap-1">
                <LocationOnIcon className="text-[#A3A1A1] h-[16.3px] w-auto" />
                <span className="text-grey text-special font-body font-light">
                  {location}
                </span>
              </div>
            </React.Suspense>

            {created_at && (
              <div className="text-grey text-special font-body font-light">
                {date.getDay()} {month(date.getMonth())}
              </div>
            )}
          </div>

          <div className="text-title_3 font-body font-medium text-white">
            {price && <>N{price.toLocaleString()}</>}
          </div>
        </div>

        {variant === "user" ? null : (
          <div className="flex items-end h-fit justify-between">
            <div className="flex items-end h-fit gap-2">
              <React.Suspense
                fallback={
                  <div className="mt-[26px] text-stroke animate-pulse h-6 w-6 rounded-full"></div>
                }
              >
                <Link href={`/profile/${user_id}/`}>
                  {false ? (
                    <Image
                      src={`https://${image_url}`}
                      height={20}
                      width={20}
                      className="rounded-full"
                      alt={`${user}'s profile pic`}
                    />
                  ) : (
                    <PersonIcon className="mt-[26px] text-stroke p-[2.33px] bg-[#D9D9D9] rounded-full self-center hover:cursor-pointer" />
                  )}
                </Link>
              </React.Suspense>

              <Link href={`/profile/${user_id}/`}>
                <div className="font-headline font-bold text-body_2 text-white hover:cursor-pointer">
                  {user ? user : "Username"}
                </div>
              </Link>
            </div>

            <Dialog
              dialogTrigger={
                <div className="flex gap-1 items-center hover:cursor-pointer">
                  <div className="font-headline text-body_2 font-bold text-sm text-[#20E010]">
                    WhatsApp
                  </div>
                  <React.Suspense>
                    <NorthEastIcon className="text-[#20E010]" />
                  </React.Suspense>
                </div>
              }
              className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="bg-white px-3 py-4 font-body w-[200px] rounded-md">
                <div>You are about to leave this site, continue?</div>
                <div className="mt-2 flex justify-center gap-10">
                  <div
                    className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-primary/60 hover:cursor-pointer"
                    onClick={() => {
                      const dialogCloseTrigger =
                        document.getElementById("dialogCloseTrigger");
                      dialogCloseTrigger?.click();
                    }}
                  >
                    No
                  </div>
                  <Link href={whatsapp_link}>
                    <div className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-secondary hover:cursor-pointer">
                      Yes
                    </div>
                  </Link>
                </div>
              </div>
            </Dialog>
          </div>
        )}

        {variant === "user" ? (
          <div className="flex items-center gap-8 mt-6">
            <React.Suspense>
              <DeleteIcon
                className="text-white hover:cursor-pointer"
                onClick={(e) => onClickDeleteBtn(e, responseid)}
              />
            </React.Suspense>
            <Image
              src="/images/icons/editIcon.png"
              width={24}
              height={24}
              alt="edit"
              className="hover:cursor-pointer"
            />
          </div>
        ) : null}
      </div>
    );
  }
);

ResponseCard.displayName = "ResponseCard";

export default ResponseCard;
