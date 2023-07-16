"use client";

import { cn } from "@/app/lib/utils";
import Image from "next/image";
import React, { DragEvent, MouseEvent } from "react";

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
    setImageFile: React.Dispatch<React.SetStateAction<FileList | undefined>>;
  }
>(
  (
    { children, className, images, setImages, setImageFile, ...props },
    fowardref
  ) => {
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

      setImages([{ name: files[0].name, url: URL.createObjectURL(files[0]) }]);
      setImageFile(files);
    };

    const deleteImage = (event: MouseEvent) => {
      event.stopPropagation();
      setImages([]);
      // setImageFile([]);
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      const files = event.dataTransfer.files;
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
          "relative rounded-lg border-[1px] border-stroke bg-faded hover:cursor-pointer flex items-center justify-center",
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
              <div className="relative w-1/2 h-1/2" key={index}>
                <img src={image.url} alt={image.name} className="h-1/2 w-1/2" />
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
          <Image
            src={"/images/icons/imagePlaceholderIcon.png"}
            height={80}
            width={80}
            alt="add image"
          />
        )}

        <input
          type="file"
          name=""
          id=""
          className="hidden"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg"
          onChange={onFileSelect}
        />
      </div>
    );
  }
);

FileDragDrop.displayName = "FileDragDrop";

export default FileDragDrop;
