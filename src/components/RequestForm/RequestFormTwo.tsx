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
    <div className={cn("h-full w-full", className)} ref={fowardref} {...props}>
      <h2 className="mt-8 font-headline text-headline_3 font-bold text-[#000000] text-left">
        Visualize Your Request!
      </h2>

      <FormPrimitive.Field
        name="request"
        className="md:px-6 flex flex-col justify-center items-center gap-4 h-full w-full"
      >
        <FileDragDrop
          images={images}
          setImages={setImages}
          setImageFile={setImageFile}
          className="h-1/2 w-1/2"
        />

        <div className="font-body font-medium text-title_3 text-[#000000]">
          Add clarity with an image{" "}
          <span className="font-body font-light text-body_2">(optional)</span>
        </div>
      </FormPrimitive.Field>
    </div>
  );
});

RequestFormTwo.displayName = "RequestFormTwo";

export default RequestFormTwo;
