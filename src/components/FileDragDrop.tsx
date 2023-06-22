"use client";

import { cn } from "@/app/lib/utils";
import React, { DragEvent, MouseEvent } from "react";

const ImageIcon = React.lazy(() => import("@mui/icons-material/Image"));
const DeleteIcon = React.lazy(() => import("@mui/icons-material/Delete"));

const FileDragDrop = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    images: {
      name: string;
      url: string;
    }[];
    setImages: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          url: string;
        }[]
      >
    >;
  }
>(({ children, className, images, setImages, ...props }, fowardref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (!files || files?.length === 0) return;

    // for (let i = 0; i < files.length; i++) {
    //   if (files[i].type.split("/")[0] !== "image") continue;
    //   if (!images.some((e) => e.name === files[i].name)) {
    //     setImages([
    //       ...images,
    //       { name: files[i].name, url: URL.createObjectURL(files[i]) },
    //     ]);
    //   }
    // }

    setImages([{ name: files[0].name, url: URL.createObjectURL(files[0]) }]);
  };

  const deleteImage = (event: MouseEvent) => {
    event.stopPropagation();
    setImages([]);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    // for (let i = 0; i < files.length; i++) {
    //   if (files[i].type.split("/")[0] !== "image") continue;
    //   if (!images.some((e) => e.name === files[i].name)) {
    //     setImages([
    //       ...images,
    //       { name: files[i].name, url: URL.createObjectURL(files[i]) },
    //     ]);
    //   }
    // }

    // setImages([{ name: files[0].name, url: URL.createObjectURL(files[0]) }]);
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        "relative w-[100px] h-[100px] rounded-lg border-[1px] border-stroke bg-faded hover:cursor-pointer flex items-center justify-center",
        className
      )}
      onClick={selectFiles}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      ref={fowardref}
    >
      {images.length > 0 ? (
        images.map((image, index) => {
          return (
            <div className="relative w-[100px] h-[100px]" key={index}>
              <img
                src={image.url}
                alt={image.name}
                className="h-[100px] w-fit"
              />
              <React.Suspense
                fallback={
                  <div className="absolute top-0 right-0 w-4 h-4 bg-stroke/80"></div>
                }
              >
                <DeleteIcon
                  className="absolute top-0 right-0 text-stroke w-4 h-4"
                  onClick={deleteImage}
                />
              </React.Suspense>
            </div>
          );
        })
      ) : (
        <React.Suspense>
          <ImageIcon className="text-[#000000]/60 w-[28px] h-[28px]" />
        </React.Suspense>
      )}

      <input
        type="file"
        name=""
        id=""
        className="hidden"
        ref={fileInputRef}
        onChange={onFileSelect}
      />
    </div>
  );
});

FileDragDrop.displayName = "FileDragDrop";

export default FileDragDrop;
