"use client";

import { responsesConfig } from "@/config.ts/responses";
import { cn } from "@/lib/utils";
import React from "react";

const ResponseCard = React.lazy(() => import("@/components/ResponseCard"));
const CommentsIcon = React.lazy(() => import("@mui/icons-material/Quickreply"));

const Responses = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)}>
      <div className="bg-secondary w-fit flex gap-[10px] p-2 items-center">
        <React.Suspense
          fallback={<div className="w-4 h-4 bg-stroke/80 animate-pulse"></div>}
        >
          <CommentsIcon className="text-white" />
        </React.Suspense>

        <div className="font-headline text-white text-headline_2 font-bold">
          Responses (4)
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:flex-wrap items-center gap-6">
        {responsesConfig.map((responseConfig) => {
          const { id, ...others } = responseConfig;
          return <ResponseCard key={id} {...others} />;
        })}
      </div>
    </div>
  );
});

Responses.displayName = "Responses";

export default Responses;
