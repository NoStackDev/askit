import Image from "next/image";
import React from "react";
import Button from "./ui/Button";
import { cn } from "@/app/lib/utils";

const RequestPlaced = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    doneButton: React.ReactNode;
  }
>(({ children, className, doneButton, ...props }, forwardRef) => {
  return (
    <div
      className={cn(
        "w-[347px] flex flex-col gap-6 items-center bg-white pt-[88px] pb-[66px] px-7 rounded-[20px]",
        className
      )}
      ref={forwardRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Image
        src={"/images/pictures/requestPlaced.png"}
        width={175.88}
        height={150}
        alt="request placed"
      />

      <div className="text-center mt-[60px] font-mono font-bold text-[#000000] text-headline_2">
        Request Placed
      </div>

      <div className="text-center font-body text-body_1 text-[#000000]">
        Your request was successfully sent out to community, individuals with
        appropriate offers will respond to it.
      </div>

      {doneButton}
    </div>
  );
});

RequestPlaced.displayName = "RequestPlaced";

export default RequestPlaced;
