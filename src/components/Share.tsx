"use client";

import React from "react";

const Share = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(() => {
  return <div>Share</div>;
});

Share.displayName = "Share";

export default Share;
