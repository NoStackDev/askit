"use client";

import { cn } from "@/lib/utils";
import React from "react";

const ResponseCard = React.lazy(() => import("@/components/ResponseCard"));

const Responses = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & {
    responses: {
      userId: number;
      username: string;
      avatar: null | string;
      image?: boolean;
      response: string;
      date: Date;
      location: string;
      price: number;
      whatsappLink: string;
    }[];
    variant?: "user";
  }
>(({ className, children, responses, variant, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)}>
      <div className="mt-6 flex flex-col md:grid md:grid-cols-r-cards w-full gap-6">
        {responses.map((response) => {
          return (
            <ResponseCard
              key={response.userId}
              {...response}
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
