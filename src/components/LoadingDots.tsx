import { cn } from "@/app/lib/utils";
import React from "react";

type Props = {};

const LoadingDots = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, forwardRef) => {
  return (
    <div
      className={cn(
        "flex justify-between items-start w-fit h-fit gap-3",
        className
      )}
      ref={forwardRef}
      {...props}
    >
      <div className="h-3 w-3 rounded-full bg-secondary animate-[bounce_1s_infinite_50ms]"></div>
      <div className="h-3 w-3 rounded-full bg-secondary animate-[bounce_1s_infinite_150ms]"></div>
      <div className="h-3 w-3 rounded-full bg-secondary animate-[bounce_1s_infinite_200ms]"></div>
    </div>
  );
});

LoadingDots.displayName = "LoadingDots";

export default LoadingDots;
