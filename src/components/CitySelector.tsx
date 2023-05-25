"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import { citiesConfig } from "@/config.ts/cities";
import ScrollArea from "./ui/ScrollAreaPrimitive";

const CitySelector = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        asChild
        id="DialogPrimitive.Trigger"
        className="flex gap-2"
      >
        <div className="flex justify-end items-center">
          <button className="h-6 w-6 bg-[#D9D9D9] border-[1px] border-primary"></button>
          <label
            htmlFor="DialogPrimitive.Trigger"
            className="text-primary font-body text-title_3"
          >
            Filter
          </label>
        </div>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal className="">
        <DialogPrimitive.Overlay className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-stroke/70 z-20 overflow-hidden transition-all duration-[600ms] ease-in-out" />

        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 p-4 bg-white border-[1px] border-stroke rounded-[20px]">
          <form>
            <ScrollArea className="z-40">
              {citiesConfig.reverse().map((cityConfig) => {
                return (
                  <div
                    className="flex gap-2 items-center"
                    key={cityConfig.geonameid}
                  >
                    <CheckboxPrimitive.Root
                      className="flex h-5 w-5 appearance-none items-center justify-center rounded-[4px] border-[1px] border-stroke"
                      id={cityConfig.geonameid.toString()}
                    >
                      <CheckboxPrimitive.Indicator className="">
                        <CheckIcon className="text-stroke" />
                      </CheckboxPrimitive.Indicator>
                    </CheckboxPrimitive.Root>
                    <label
                      className="Label"
                      htmlFor={cityConfig.geonameid.toString()}
                    >
                      {cityConfig.name}
                    </label>
                  </div>
                );
              })}
            </ScrollArea>
          </form>

          <div className="flex justify-between">
            <button className="text-body_2 font-body text-primary/70">
              clear all
            </button>

            <button className="text-body_2 font-body text-primary">
              apply
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

CitySelector.displayName = "CitySelector";

export default CitySelector;
