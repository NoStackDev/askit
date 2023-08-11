"use client";

import React from "react";
import { RWebShare } from "react-web-share";

const Share = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(() => {
  return (
    <div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Flamingos",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div>
  );
});

Share.displayName = "Share";

export default Share;
