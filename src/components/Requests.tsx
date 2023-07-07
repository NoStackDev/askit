import RequestCard from "@/components/RequestCard";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { RequestType } from "@/app/types";

const Requests = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    requests: RequestType[];
    variants?: "user";
  }
>(({ children, className, requests, variants, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-6 md:grid md:grid-cols-r-cards md:gap-x-5 gap-y-6",
        className
      )}
      {...props}
    >
      {requests.map((request) => {
        const { id: requestId, ...others } = request;
        return (
          <RequestCard {...others} requestId={requestId} variant={variants} />
        );
      })}
    </div>
  );
});

Requests.displayName = "Requests";

export default Requests;
