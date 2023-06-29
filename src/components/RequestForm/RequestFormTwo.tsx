import React, { HTMLAttributes } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

import * as FormPrimitive from "@radix-ui/react-form";
import { cn } from "@/app/lib/utils";
import FileDragDrop from "../FileDragDrop";

interface FormTwoI {
  images: { name: string; url: string }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ name: string; url: string }[]>
  >;
}

const RequestFormTwo = React.forwardRef<
  React.ElementRef<"div">,
  HTMLAttributes<HTMLDivElement> & FormTwoI
>(({ className, images, setImages, ...props }, fowardref) => {
  return (
    <div className={cn("h-full w-full", className)} ref={fowardref} {...props}>
      <h2 className="mt-8 font-headline text-headline_2 font-bold text-[#000000] text-left">
        Visualize Your Request!
      </h2>

      <FormPrimitive.Field
        name="request"
        className="mt-10 md:px-6 flex justify-center items-center gap-1 w-full"
      >
        <FileDragDrop
          images={images}
          setImages={setImages}
          className="h-[210px] w-[210px]"
        />
      </FormPrimitive.Field>
    </div>
  );
});

RequestFormTwo.displayName = "RequestFormTwo";

export default RequestFormTwo;
