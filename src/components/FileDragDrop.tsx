"use client";

import { cn } from "@/lib/utils";
import React from "react";

const ImageIcon = React.lazy(() => import("@mui/icons-material/Image"));

const FileDragDrop = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, fowardref) => {
  const [images, setImages] = React.useState<any>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      ref={fowardref}
      className={cn(
        "relative w-[100px] h-[100px] rounded-lg border-[1px] border-stroke bg-faded hover:cursor-pointer flex items-center justify-center",
        className
      )}
      {...props}
    >
      <input type="file" name="" id="" ref={fileInputRef} className="hidden"/>
    </div>
  );
});

FileDragDrop.displayName = "FileDragDrop";

export default FileDragDrop;
