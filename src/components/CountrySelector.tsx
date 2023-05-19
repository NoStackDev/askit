"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Select from "@radix-ui/react-select";
import Image from "next/image";

import { flagsConfig } from "@/config.ts/flags";

const CountrySelector = React.forwardRef<
  React.ElementRef<typeof Select.Root>,
  React.ComponentPropsWithoutRef<typeof Select.Root>
>(({ children }, ref) => {
  return (
    <Select.Root defaultValue="ng">
      <Select.Trigger
        className="inline-flex items-center justify-center rounded bg-white gap-2 py-2 px-1 w-12 h-8"
        aria-label="Food"
        ref={ref}
      >
        <Select.Value />
        <Select.Icon className="SelectIcon">
          <Image
            src="/images/icons/arrow.svg"
            alt="goto"
            height={12}
            width={8}
            className="scale-100 invert-[43%] sepia-[24%] saturate-[0%] hue-rotate-[222deg] brightness-[111%] contrast-[91%] rotate-90"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="z-30">
        <Select.Content
          position="popper"
          className="group overflow-hidden bg-white data-[state=closed]"
        >
          <Select.Viewport className="SelectViewport">
            <Select.Group className="flex flex-col gap-4 bg-white w-fit">
              <Select.Label className="SelectLabel"></Select.Label>
              {flagsConfig.map((flagConfig) => {
                return (
                  <>
                    <SelectItem
                      key={flagConfig.countryCode}
                      value={flagConfig.countryCode}
                      className="flex gap-1 items-center justify-center mb-1"
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${flagConfig.countryCode}.png`}
                        width={24}
                        height={18}
                        alt={`${flagConfig.countryName}`}
                        className="w-6 h-4"
                      />
                      {/* <Select.Label className="inline group-data-[state=closed]:hidden">{flagConfig.countryName}</Select.Label> */}
                    </SelectItem>
                  </>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});

CountrySelector.displayName = "CountrySelector";

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

export default CountrySelector;
