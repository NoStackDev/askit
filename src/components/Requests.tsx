import RequestCard from "@/components/RequestCard";
import Button from "@/components/ui/Button";
import { requestsConfig } from "@/config.ts/requests";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

const Requests = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    requests: {
      requestId: number;
      image?: boolean;
      description: string;
      moreDetail: null | string;
      commentCount: number;
      date: Date;
      location: string;
      bookmarked: boolean;
    }[];
  }
>(({ children, className, requests, ...props }, ref) => {
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
        return (
          <Link href={`/requests/${request.requestId}`} key={request.requestId}>
            <RequestCard
              image={request.image}
              description={request.description}
              commentCount={request.commentCount}
              date={request.date}
              location={request.location}
              bookmarked={request.bookmarked}
            />
          </Link>
        );
      })}
    </div>
  );
});

Requests.displayName = "Requests";

export default Requests;
