"use client";

import { cn } from "@/app/lib/utils";
import { RequestDetailResponseType, ResponseType } from "@/app/types";
import React from "react";

const ResponseCard = React.lazy(() => import("@/components/ResponseCard"));

const Responses = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & {
    responses: RequestDetailResponseType[];
    variant?: "user";
  }
>(({ className, children, responses, variant, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="flex flex-col gap-6 md:grid md:grid-cols-r-cards md:gap-x-5 gap-y-6">
        {responses.map((response) => {
          const { id: responseId, ...others } = response;
          return (
            <ResponseCard
              key={responseId}
              {...others}
              responseid={responseId}
              variant={variant}
            />
          );
        })}
      </div>
    </div>
  );
});

Responses.displayName = "Responses";

export default Responses;
