"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const RequestsFilter = React.forwardRef<React.ElementRef<"div">, Props>(
  ({ className, ...props }, ref) => {
    const [country, setCountry] = React.useState('ng')
    const [city, setCity] = React.useState<string|null>(null)

    return (
      <div
        ref={ref}
        className={twMerge(
          "rounded px-2 py-1 grid grid-cols-[max-content_max-content_1fr] gap-2 items-center  bg-[#E9EEFE] min-w-[290px]",
          className
        )}
      >
        <CountrySelector />
        <div className="font-body text-body_2 font-normal max-w-[32ch]">whole country</div>
        <CitySelector className="w-full "/>
      </div>
    );
  }
);

export default RequestsFilter;
