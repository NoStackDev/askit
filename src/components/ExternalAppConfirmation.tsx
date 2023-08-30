import Image from "next/image";
import React from "react";
import Button from "./ui/Button";

const ExternalAppConfirmation = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    closeDialogElement: React.ReactNode;
    appTitle: string;
  }
>(
  (
    { children, className, closeDialogElement, appTitle, ...props },
    forwardRef
  ) => {
    return (
      <div
        className="w-[347px] flex flex-col gap-6 items-center bg-white pt-[88px] md:pt-[70px] pb-[66px] md:pb-[50px] px-7 rounded-[20px]"
        ref={forwardRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src={"/images/pictures/externalAppConfirmation.png"}
          width={175.88}
          height={150}
          alt="request placed"
        />

        <div className="text-center mt-[60px] md:mt-[50px] font-mono font-bold text-[#000000] text-headline_2">
          Chat on {appTitle}
        </div>

        <div className="text-center font-body text-body_1 text-[#000000]">
          Exercise caution while dealing with users by following our{" "}
          <a href="/safetyhints">
            <span className="underline underline-offset-2 font-bold">
              Safety Hints
            </span>
          </a>
        </div>

        {closeDialogElement}
      </div>
    );
  }
);

ExternalAppConfirmation.displayName = "ExternalAppConfirmation";

export default ExternalAppConfirmation;
