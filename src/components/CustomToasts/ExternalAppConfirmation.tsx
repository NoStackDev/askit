import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

const ExternalAppConfirmation = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    closeDialogElement: React.ReactNode;
  }
>(({ children, className, closeDialogElement, ...props }, forwardRef) => {
  return (
    <div
      className="w-[347px] flex flex-col gap-6 items-center bg-white pt-[88px] pb-[66px] px-7 rounded-[20px]"
      ref={forwardRef}
    >
      <Image
        src={"/images/pictures/externalAppConfirmation.png"}
        width={175.88}
        height={150}
        alt="request placed"
      />

      <div className="text-center mt-[60px] font-mono font-bold text-[#000000] text-headline_2">
        Chat on WhatsApp
      </div>

      <div className="text-center font-body text-body_1 text-[#000000]">
        Exercise caution while dealing with users by following our{" "}
        <span className="underline underline-offset-2 font-bold">Safety Hints</span>
      </div>

      {/* {closeDialogElement} */}

      <div className="flex flex-col gap-6 items-center">
        <Button className="px-11 py-3 rounded-lg">Proceed to WhatsApp</Button>

        <Button variant={"outlined2"} className="px-[72px] py-3 text-black border-black">
          Cancel
        </Button>
      </div>
    </div>
  );
});

ExternalAppConfirmation.displayName = "ExternalAppConfirmation";

export default ExternalAppConfirmation;
