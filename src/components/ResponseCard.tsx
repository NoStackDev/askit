import { cn, month } from "@/app/lib/utils";
import { RequestDetailResponseType, ResponseType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      responseid: number,
      image_url,
      location,
      title,
      user,
      price,
      variant,
      ...props
    },
    ref
  ) => {
    const date = new Date(created_at);

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
            <Image
              src={`https://${image_url}`}
              width={92}
              height={92}
              alt={`${user}'s profile pic`}
            />
          )}

          <div className="font-body text-white text-title_3 font-medium">
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
                {/* response from api has no user id  */}
                {/* <Link href={`/user/${userId}/`}> */}
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
                {/* </Link> */}
              </React.Suspense>

              {/* <Link href={`/user/${userId}/`}> */}
              <div className="font-headline font-bold text-body_2 text-white hover:cursor-pointer">
                {user ? user : "Username"}
              </div>
              {/* </Link> */}
            </div>

            <div className="flex gap-1 items-center hover:cursor-pointer">
              <div className="text-primary font-headline text-body_2 font-bold text-sm">
                WhatsApp
              </div>
              <React.Suspense>
                <NorthEastIcon className="text-primary" />
              </React.Suspense>
            </div>
          </div>
        )}

        {variant === "user" ? (
          <div className="flex items-center gap-8 mt-6">
            <React.Suspense>
              <DeleteIcon className="text-white hover:cursor-pointer" />
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
