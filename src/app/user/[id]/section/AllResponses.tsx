import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const AllResponses = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, forwardRef) => {
  return (
    <div ref={forwardRef} className={cn("", className)} {...props}>
      <div className="font-headline text-headline_2 font-bold text-white bg-[#48466D] w-fit"> All Responses</div>
    </div>
  );
});

AllResponses.displayName = "AllResponses";

export default AllResponses;
