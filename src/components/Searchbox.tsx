import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Searchbox = React.forwardRef<React.ElementRef<"div">, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative h-fit", className)} ref={ref}>
        <input
          type="text"
          placeholder="Search"
          className="py-2 pr-8 pl-2 bg-background w-full border-[1px] border-stroke rounded-[14px] placeholder:font-body placeholder:text-body_1 placeholder:font-normal placeholder:text-stroke font-body text-body_1 text-stroke"
        />
        <Image
          src="/images/icons/searchIcon.png"
          width={18}
          height={18}
          alt="search"
          className="absolute top-1/2 -translate-y-1/2 right-2"
        />
      </div>
    );
  }
);

Searchbox.displayName = "Searchbox";

export default Searchbox;
