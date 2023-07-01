"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/Menubar";
import Image from "next/image";
import Dialog from "./ui/DialogPrimitive";
import { statesConfig } from "@/config.ts/cities";

const FilterAltIcon = React.lazy(() => import("@mui/icons-material/FilterAlt"));
const ChevronRightIcon = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);
const ArrowBackIcon = React.lazy(() => import("@mui/icons-material/ArrowBack"));

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const RequestsFilter = React.forwardRef<React.ElementRef<"div">, Props>(
  ({ className, ...props }, ref) => {
    const [country, setCountry] = React.useState("ng");
    const [stateFilter, setStateFilter] = React.useState<string | null>(null);
    const [cityFilter, setCityFilter] = React.useState<string | null>(null);

    const states = Object.keys(statesConfig);

    return (
      <div
        ref={ref}
        className={twMerge(
          "rounded px-2 py-1 flex items-center justify-between  bg-[#E9EEFE] min-w-[290px]",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <Image
            src={"https://flagsapi.com/NG/flat/64.png"}
            width={24}
            height={18}
            alt="Nigerian flag"
          />

          <span className="font-body text-body_2 font-normal max-w-[32ch]">
            {cityFilter ? cityFilter : "whole country"}
          </span>
        </div>

        <Dialog
          dialogTrigger={
            <div className="flex items-center gap-2 hover:cursor-pointer">
              <React.Suspense
                fallback={
                  <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
                }
              >
                <FilterAltIcon className="text-primary w-4 h-4" />
              </React.Suspense>
              <span className="font-body text-title_3 font-medium text-primary">
                Filter
              </span>
            </div>
          }
          className="fixed top-1/2 left-1/2 z-30 -translate-y-1/2 -translate-x-1/2"
        >
          <div className="bg-white max-h-[500px] w-[80vw] max-w-[360px]">
            <div>
              <div className="px-4 pt-10 pb-4 border-b border-[#000000]/10 flex flex-col gap-8">
                <h3 className="font-headline text-headline_3 font-bold">
                  Filter Location
                </h3>
                {stateFilter ? (
                  <div
                    className="flex gap-4 items-center hover:cursor-pointer"
                    onClick={() => setStateFilter(null)}
                  >
                    <React.Suspense
                      fallback={
                        <div className="w-4 h-4 bg-stroke/60 animate-pulse"></div>
                      }
                    >
                      <ArrowBackIcon className="w-4 h-4" />
                    </React.Suspense>

                    <h4 className="font-body text-lg font-medium text-[#000000]/60">
                      {stateFilter}
                    </h4>
                  </div>
                ) : (
                  <h4 className="font-body text-lg font-medium text-[#000000]/60">
                    States
                  </h4>
                )}
              </div>
              <div className="p-4 flex flex-col gap-4 div max-h-[268px] overflow-auto">
                {stateFilter
                  ? statesConfig[stateFilter]
                      .sort()
                      .reverse()
                      .map((city) => {
                        return (
                          <div
                            className="hover:bg-stroke/20 hover:cursor-pointer font-body text-title_2 font-medium"
                            key={city.geonameid}
                            onClick={() => {
                              setCityFilter(city.name);
                              setStateFilter(null);
                              const dialogCloseTrigger =
                                document.getElementById("dialogCloseTrigger");
                              dialogCloseTrigger?.click();
                            }}
                          >
                            {city.name}
                          </div>
                        );
                      })
                  : states.sort().map((state, index) => {
                      return (
                        <div
                          className="hover:bg-stroke/20 hover:cursor-pointer flex items-center justify-between"
                          key={index}
                          onClick={() => setStateFilter(state)}
                        >
                          {state}

                          <React.Suspense
                            fallback={
                              <div className="w-5 h-5 bg-stroke/60 animate-pulse"></div>
                            }
                          >
                            <ChevronRightIcon className="w-5 h-5 text-[#000000]/60" />
                          </React.Suspense>
                        </div>
                      );
                    })}
              </div>
            </div>

            {/* <div>
              <div>
                <h3>Filter Location</h3>
                <h4>States</h4>
              </div>
            </div> */}
          </div>
        </Dialog>

        {/* <Menubar className="">
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2">
              <React.Suspense
                fallback={
                  <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
                }
              >
                <FilterAltIcon className="text-primary w-4 h-4" />
              </React.Suspense>
              <span className="font-body text-title_3 font-medium text-primary">
                Filter
              </span>
            </MenubarTrigger>

            <MenubarContent className="min-w-[150px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity] z-30 max-h-[50vh] overflow-auto">
              {states.map((state, index) => {
                return (
                  <MenubarSub key={index}>
                    <MenubarSubTrigger className="max-w-[200px] group font-body text-special leading-none rounded flex items-center justify-between h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-stroke/60 data-[highlighted]:bg-gradient-to-br data-[disabled]:pointer-events-none">
                      {state.name}
                      <React.Suspense
                        fallback={
                          <div className="w-5 h-5 bg-stroke/60 animate-pulse"></div>
                        }
                      >
                        <ChevronRightIcon className="w-5 h-5 text-[#000000]/80" />
                      </React.Suspense>
                    </MenubarSubTrigger>

                    <MenubarSubContent className="min-w-[150px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity] z-40 ax-h-[50vh] overflow-auto">
                      {state.cities.map((city) => {
                        return (
                          <MenubarItem
                            key={city.geonameid}
                            className="px-1 font-body text-special hover:cursor-default hover:bg-stroke/60 relative select-none outline-none data-[state=open]:bg-stroke/60 data-[highlighted]:bg-gradient-to-br data-[disabled]:pointer-events-none"
                          >
                            {city.name}
                          </MenubarItem>
                        );
                      })}
                    </MenubarSubContent>
                  </MenubarSub>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        </Menubar> */}
      </div>
    );
  }
);

RequestsFilter.displayName = "RequestsFilter";

export default RequestsFilter;
