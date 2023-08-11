import { cn } from "@/app/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ReportUserCard = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, forwardRef) => {
  return (
    <div
      className={cn(
        "pt-6 pb-11  bg-white w-full h-full md:max-h-[600px] md:max-w-[375px] md:rounded-lg",
        className
      )}
    >
      <div className="px-5 flex items-center gap-4">
        <DialogClose asChild>
          <Image
            src={"/images/icons/arrowRequestForm.png"}
            height={20}
            width={24}
            alt="back"
            className="w-6 h-6 hover:cursor-pointer"
          />
        </DialogClose>

        <div className="font-headline font-bold text-headline_2 text-black">
          Report
        </div>
      </div>

      <div className="border-t border-grey/20 w-full mt-3"></div>

      <div className="px-5 mt-6">
        <div className="font-body text-title_2 font-medium text-secondary">
          Help us keep the community safe and conducive for everyone, report any
          inappropriate act.
        </div>

        <div className="mt-6">
          <div className="font-body font-medium text-title_3 text-[#000000]">
            Report
          </div>

          <Link
            href={"/"}
            className="mt-2 font-body font-medium text-title_3 text-[#000000]/50"
          >
            placeholderlink
          </Link>
        </div>

        <div className="mt-6">
          <div className="font-body text-title_3 font-medium text-black">
            Comment
          </div>
          <textarea
            className="mt-1 border border-stroke font-body text-body_1 placeholder:font-body placeholder:text-body_1 placeholder:text-[#000000]/60 text-[#000000] w-full rounded-lg bg-stroke/10 px-3 py-4"
            placeholder="Write your complaint... "
            rows={5}
          />
        </div>
      </div>
    </div>
  );
});

ReportUserCard.displayName = "ReportUserCard";

export default ReportUserCard;
