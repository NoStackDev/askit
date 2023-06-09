import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/app/lib/utils";

const VisibilityRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    setVisibility: React.Dispatch<React.SetStateAction<"private" | "public">>;
  }
>(({ className, defaultValue, setVisibility, ...props }, fowardref) => (
  <RadioGroupPrimitive.Root
    className={cn("flex flex-col gap-2 w-full", className)}
    defaultValue="public"
    aria-label="Response visibility"
    onValueChange={(e) => {
      const visibility = e === "private" ? "private" : "public";
      setVisibility(visibility);
    }}
  >
    <div className="font-body text-title_3 text-[#000000] font-medium">
      Visibility
    </div>

    <div className="flex gap-8 w-full">
      <div className="flex items-center">
        <RadioGroupPrimitive.Item
          className="bg-white w-3 h-3 rounded-full hover:bg-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default border-[1px] border-black"
          value="public"
          id="public"
          onClick={(e) => {
            setVisibility("public");
          }}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-black" />
        </RadioGroupPrimitive.Item>

        <label
          className="text-body_2 font-body leading-none pl-1 text-[#000000]"
          htmlFor="public"
        >
          Public
        </label>
      </div>

      <div className="flex items-center">
        <RadioGroupPrimitive.Item
          className="bg-white w-3 h-3 rounded-full hover:bg-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default  border-[1px] border-black"
          value="private"
          id="private"
          onClick={(e) => setVisibility("public")}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-black" />
        </RadioGroupPrimitive.Item>

        <label
          className="text-body_2 font-body leading-none pl-1 text-[#000000]"
          htmlFor="private"
        >
          Private
        </label>
      </div>
    </div>

    <div className="font-body text-body_3 text-black/60">
      *Public - everyone can see your response. | *Private- only be visible by
      the user with the request.
    </div>
  </RadioGroupPrimitive.Root>
));

VisibilityRadioGroup.displayName = "VisibilityRadioGroup";

export default VisibilityRadioGroup;
