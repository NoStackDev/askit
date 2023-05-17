import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Advertisements = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {childrenArray.map((child) => {
          return child;
        })}
      </div>
    );
  }
);

Advertisements.displayName = "Advertisements";

export default Advertisements;
