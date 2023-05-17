import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const DealsCard = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("rounded-2xl", className)} {...props}>
        {children}
      </div>
    );
  }
);

DealsCard.displayName = "DealsCard";

export default DealsCard;
