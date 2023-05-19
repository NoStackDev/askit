"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import Image from "next/image";

import { flagsConfig } from "@/config.ts/flags";

const CitySelector = React.forwardRef<
  React.ElementRef<typeof Select.Root>,
  React.ComponentPropsWithoutRef<typeof Select.Root>
>(({ children }, ref) => {
  return (
    <Select.Root defaultValue="wholeCountry">
      <Select.Trigger
        className="text-title_3 font-medium font-body text-black inline-flex items-center justify-between w-full rounded"
        aria-label="Food"
        ref={ref}
      >
        <Select.Value className="text-title_3 font-medium font-body text-black" />
        <Select.Icon className="SelectIcon">
          <Image
            src="/images/icons/arrow.svg"
            alt="goto"
            height={11.31}
            width={6.71}
            className="h-[11.31px] w-[6.71px] invert-[43%] sepia-[24%] saturate-[0%] hue-rotate-[222deg] brightness-[111%] contrast-[91%] rotate-90"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="z-30">
        <Select.Content
          position="popper"
          className="group overflow-hidden pl-3 bg-white data-[state=closed]"
        >
          <Select.Viewport className="SelectViewport">
            <Select.Group className="flex flex-col gap-4 bg-white w-fit">
              <Select.Label className="SelectLabel"></Select.Label>
              <SelectItem
                value={"wholeCountry"}
                className="flex gap-1 items-center justify-center text-title_3 font-medium font-body text-black"
              >
                whole country
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});

CitySelector.displayName = "CitySelector";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className="" {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

export default CitySelector;
