import React, { HTMLAttributes } from "react";

import * as FormPrimitive from "@radix-ui/react-form";
import { cn } from "@/app/lib/utils";
import FileDragDrop from "../FileDragDrop";

interface FormTwoI {
  images: { name: string; url: string }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ name: string; url: string }[]>
  >;
  setImageFile: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}

const RequestFormTwo = React.forwardRef<
  React.ElementRef<"div">,
  HTMLAttributes<HTMLDivElement> & FormTwoI
>(({ className, images, setImages, setImageFile, ...props }, fowardref) => {
  return (
    <div
      className={cn("", className)}
      ref={fowardref}
      {...props}
    >
      <h2 className="font-headline text-headline_3 font-bold text-[#000000] text-left">
        Visualize Your Request!
      </h2>

      <FormPrimitive.Field
        name="request"
        className="md:px-6 flex flex-col justify-center items-center gap-8 mt-24 md:mt-10"
      >
        <FileDragDrop
          images={images}
          setImages={setImages}
          setImageFile={setImageFile}
          className="min-h-[209px] min-w-[209px]  h-1/2 w-1/2"
        />

        <div className="font-body font-medium text-title_3 text-secondary/80">
          Add clarity with an image{" "}
          <span className="font-body font-light text-body_2 text-[#000000]">
            (optional)
          </span>
        </div>
      </FormPrimitive.Field>
    </div>
  );
});

RequestFormTwo.displayName = "RequestFormTwo";

export default RequestFormTwo;
