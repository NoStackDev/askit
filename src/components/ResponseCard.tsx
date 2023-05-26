import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const LocationOnIcon = React.lazy(
  () => import("@mui/icons-material/LocationOn")
);
const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const NorthEastIcon = React.lazy(() => import("@mui/icons-material/NorthEast"));

const ResponseCard = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & {
    username: string;
    avatar: null | string;
    image?: boolean;
    response: string;
    date: Date;
    location: string;
    price: number;
    whatsappLink: string;
  }
>(
  (
    {
      children,
      className,
      id,
      username,
      avatar,
      image,
      response,
      date,
      location,
      price,
      whatsappLink,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("p-4 bg-black rounded-[20px] w-[344px]", className)}
        {...props}
      >
        <div className="flex gap-3 items-center">
          {/* <Image  /> */}
          {/* replace with image tag before production */}
          <div>
            <div className="w-[92px] h-[92px] bg-[#D9D9D9]"></div>
          </div>
          <div className="font-body text-white text-title_3 font-medium">
            {response}
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
                  Port Harcourt
                </span>
              </div>
            </React.Suspense>

            <div className="text-grey text-special font-body font-light">
              2 feb
            </div>
          </div>

          <div className="text-title_3 font-body font-medium text-white">
            N{price.toString()}
          </div>
        </div>

        <div className="flex items-end h-fit justify-between">
          <div className="flex items-end h-fit gap-2">
            <React.Suspense
              fallback={
                <div className="mt-[26px] text-stroke animate-pulse h-6 w-6 rounded-full"></div>
              }
            >
              <PersonIcon className="mt-[26px] text-stroke p-[2.33px] bg-[#D9D9D9] rounded-full self-center" />
            </React.Suspense>

            <div className="font-headline font-bold text-white">
              {username ? username : "Username"}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <div className="text-primary font-headline font-bold text-sm">WhatsApp</div>
            <React.Suspense>
                <NorthEastIcon className="text-primary"/>
            </React.Suspense>
          </div>
        </div>
      </div>
    );
  }
);

ResponseCard.displayName = "ResponseCard";

export default ResponseCard;
