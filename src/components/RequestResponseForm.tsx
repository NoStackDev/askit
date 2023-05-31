"use client";

import React, { DragEvent, MouseEvent } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import FileDragDrop from "./FileDragDrop";

const ImageIcon = React.lazy(() => import("@mui/icons-material/Image"));
const DeleteIcon = React.lazy(() => import("@mui/icons-material/Delete"));

const RequestResponseForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [images, setImages] = React.useState<{ name: string; url: string }[]>(
    []
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    console.log("clicked to select files");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file selected");
    event.preventDefault();
    const files = event.target.files;
    console.log("file selected: ", files);
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

  console.log("images: ", images);
  return (
    <FormPrimitive.Root className="py-8 flex flex-col items-center bg-white">
      <div className="font-headline text-headline_3 font-bold text-black px-5 pb-2 border-b-[1px] border-grey/20 w-full text-center">
        Respond to This Request
      </div>

      <FormPrimitive.Field
        name="comment"
        className="px-5 mt-8 flex flex-col gap-1 w-full"
      >
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Label className="font-body text-title_3 font-medium">
            Comment
          </FormPrimitive.Label>
          <FormPrimitive.Message match={"valueMissing"}></FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild>
          <textarea
            placeholder="Here is what you are looking for..."
            className="px-3 py-4 rounded-lg border-[1px] border-stroke placeholder:font-body placeholder:text-body_1 min-h-[146px] bg-faded"
            required
          />
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <FormPrimitive.Field
        name="images"
        className="px-5 mt-8 flex flex-col items-center gap-2 w-full"
      >
        <FormPrimitive.Control asChild>
          <div
            className="relative w-[100px] h-[100px] rounded-lg border-[1px] border-stroke bg-faded hover:cursor-pointer flex items-center justify-center"
            onClick={selectFiles}
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
                <ImageIcon className="text-stroke w-[28px] h-[28px]" />
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
        </FormPrimitive.Control>

        <div className="flex items-baseline justify-between">
          <FormPrimitive.Label className="font-body text-title_3 font-medium">
            <span>Add Image</span> <span>(optional)</span>
          </FormPrimitive.Label>
        </div>
      </FormPrimitive.Field>

      {/* <FormPrimitive.Submit asChild className="px-5">
        <button>Post question</button>
      </FormPrimitive.Submit> */}
    </FormPrimitive.Root>
  );
});

RequestResponseForm.displayName = "RequestResponseForm";

export default RequestResponseForm;
