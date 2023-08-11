"use client";

import { cn } from "@/app/lib/utils";
import React from "react";
import { RWebShare } from "react-web-share";

const Share = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    shareText?: string;
  }
>(({ className, children, shareText, ...props }, forwardRef) => {
  return (
    <div className={cn("w-fit h-fit", className)} ref={forwardRef} {...props}>
      <RWebShare
        data={{
          text: shareText,
          url: window.location.href,
          title: "AskCenta",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        {children}
      </RWebShare>
    </div>
  );
});

Share.displayName = "Share";

export default Share;
