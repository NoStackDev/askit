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
    title?: string;
    titleIcon?: React.ReactNode;
    otherText?: string;
    otherIcon?: React.ReactNode;
  }
>(
  (
    {
      className,
      children,
      title,
      titleIcon,
      otherText,
      otherIcon,
      responses,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("", className)}>
        <div className="flex justify-between items-center">
          {titleIcon || title ? (
            <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center">
              {titleIcon ? titleIcon : null}

              {title ? (
                <div className="font-headline text-white text-headline_2 font-bold">
                  {title}
                </div>
              ) : null}
            </div>
          ) : null}

          {otherIcon || otherText ? (
            <div className="w-fit flex gap-[10px] p-2 items-center hover:cursor-pointer">
              {otherIcon ? otherIcon : null}

              {otherText ? (
                <div className="font-body text-black/80 text-title_3 font-medium">
                  {otherText}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:flex-wrap items-center gap-6 md:items-start">
          {responses.map((response) => {
            return <ResponseCard key={response.userId} {...response} />;
          })}
        </div>
      </div>
    );
  }
);

Responses.displayName = "Responses";

export default Responses;
