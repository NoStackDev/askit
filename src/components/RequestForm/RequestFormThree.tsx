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

interface FormThreeI {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const RequestFormThree = React.forwardRef<
  React.ElementRef<"div">,
  HTMLAttributes<HTMLDivElement> & FormThreeI
>(({ className, setDescription, ...props }, fowardref) => {
  return (
    <div className={cn("h-fit", className)} ref={fowardref} {...props}>
      <h2 className="font-headline text-headline_3 font-bold text-[#000000] text-left">
        Share More Details if You Wish!
      </h2>

      <FormPrimitive.Field
        name="request"
        className="mt-8 flex flex-col gap-1 w-full"
      >
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Label className="font-body text-title_3 font-medium text-black">
            Detailed Description{" "}
            <span className="font-body text-label text-[#000000]/60">
              (optional)
            </span>
          </FormPrimitive.Label>
        </div>

        <FormPrimitive.Control asChild>
          <textarea
            placeholder="Provide more details, if you wish..."
            rows={8}
            className="p-6 rounded-lg border-[1px] border-stroke placeholder:font-body placeholder:text-body_1 min-h-20 bg-faded placeholder:text-[#000000]/60"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormPrimitive.Control>
      </FormPrimitive.Field>
    </div>
  );
});

RequestFormThree.displayName = "RequestFormThree";

export default RequestFormThree;
