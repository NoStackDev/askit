import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const AllResponses = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, forwardRef) => {
  return (
    <div ref={forwardRef} className={cn("", className)} {...props}>
        <div></div>
      All Responses
    </div>
  );
});

AllResponses.displayName = "AllResponses";

export default AllResponses;
