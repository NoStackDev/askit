"use client";

import { cn } from "@/lib/utils";
import React from "react";

const ResponseCard = React.lazy(() => import("@/components/ResponseCard"));

const Responses = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & {
    responses: {
      id: number;
      username: string;
      avatar: null | string;
      image?: boolean;
      response: string;
      date: Date;
      location: string;
      price: number;
      whatsappLink: string;
    }[];
    title?: string;
    icon?: React.ReactNode;
  }
>(({ className, children, title, icon, responses, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)}>
      {icon || title ? (
        <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center">
          {icon ? icon : null}

          {title ? (
            <div className="font-headline text-white text-headline_2 font-bold">
              {title}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col md:flex-row md:flex-wrap items-center gap-6 md:items-start">
        {responses.map((response) => {
          const { id, ...others } = response;
          return <ResponseCard key={id} {...others} />;
        })}
      </div>
    </div>
  );
});

Responses.displayName = "Responses";

export default Responses;
