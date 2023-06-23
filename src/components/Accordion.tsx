"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/app/lib/utils";

const ExpandMoreIcon = React.lazy(
  () => import("@mui/icons-material/ExpandMore")
);

type AccordionProps = {
  items: { header: string; content: string[] }[];
};

const Accordion = ({ items }: AccordionProps) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue="item-1"
      className={cn("w-full mt-8")}
    >
      {items.map(({ header, content }, i) => (
        <AccordionPrimitive.Item
          key={`header-${i}`}
          value={`item-${i + 1}`}
          className="rounded-lg focus:outline-none w-full"
        >
          <AccordionPrimitive.Header className="w-full mt-6">
            <AccordionPrimitive.Trigger
              className={cn(
                "group",
                "focus:outline-none",
                "inline-flex w-full items-center  bg-white py-2 text-left"
              )}
            >
              <span className="font-headline text-headline_3 font-bold text-primary">
                {header}
              </span>
              <ExpandMoreIcon
                className={cn(
                  "ml-2 h-5 w-5 shrink-0 text-[#000000] group-data-[state=open]:rotate-180 transition-all duration-300 ease-in-out"
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg bg-white pb-3 transition-all duration-300 ease-in-out">
            <div className="flex flex-col items-start justify-center gap-3">
              {content.map((contentItem, index) => {
                return (
                  <p key={index} className="font-body text-body_1 text-black">
                    {contentItem}
                  </p>
                );
              })}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};

export default Accordion;
