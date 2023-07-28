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
import { useGlobalContext } from "@/app/context/Store";
import { useFeedsContext } from "@/app/context/feedsContext";
import { getRequests } from "@/app/lib/request";
import { getCities } from "@/app/lib/city";
import { CityInterface, StateCitiesInterface } from "@/app/types";

const FilterAltIcon = React.lazy(() => import("@mui/icons-material/FilterAlt"));
const ChevronRightIcon = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);
const ArrowBackIcon = React.lazy(() => import("@mui/icons-material/ArrowBack"));

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const RequestsFilter = React.forwardRef<React.ElementRef<"div">, Props>(
  ({ className, ...props }, ref) => {
    const [country, setCountry] = React.useState("ng");
    const [state, setState] = React.useState<string | null>(null);
    const [city, setCity] = React.useState<number | null>(null);
    const [cityName, setCityName] = React.useState<string | null>(null);
    const { currentFeedsUrl, setFeeds } = useFeedsContext();
    const [stateCities, setStateCities] = React.useState<{
      [id: string]: CityInterface[];
    } | null>(null);
    const contentInfoRef = React.useRef<HTMLDivElement>(null);

    const states = stateCities ? Object.keys(stateCities) : null;

    React.useEffect(() => {
      const stateCitiesIntermediate = window.localStorage.getItem("cities");

      if (!stateCitiesIntermediate) {
        (async () => {
          try {
            const citiesRes = await getCities();
            window.localStorage.setItem("cities", JSON.stringify(citiesRes));
            setStateCities(citiesRes);
          } catch (err) {
            console.log(err);
          }
        })();
      } else {
        setStateCities(JSON.parse(stateCitiesIntermediate));
      }
    }, []);

    const onCityClick = async (cityId: number) => {
      try {
        currentFeedsUrl?.searchParams.delete("city_id");
        currentFeedsUrl?.searchParams.append("city_id", cityId.toString());
        const feedsResponse = await getRequests(currentFeedsUrl);
        setFeeds(feedsResponse);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "rounded px-2 py-1 flex items-center justify-between min-w-[290px] bg-white",
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
            {cityName ? cityName : "whole country"}
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
          className="top-1/2 -translate-y-1/2 fixed left-1/2 -translate-x-1/2"
        >
          <div className="bg-white max-h-[500px] w-[80vw] max-w-[360px]">
            <div>
              <div className="px-4 pt-10 pb-4 border-b border-[#000000]/10 flex flex-col gap-8">
                <h3 className="font-headline text-headline_3 font-bold">
                  Filter Location
                </h3>
                {state ? (
                  <div
                    className="flex gap-4 items-center hover:cursor-pointer"
                    onClick={() => {
                      setState(null);
                      if (contentInfoRef.current) {
                        contentInfoRef.current.scrollTo(0, 0);
                      }
                    }}
                  >
                    <React.Suspense
                      fallback={
                        <div className="w-4 h-4 bg-stroke/60 animate-pulse"></div>
                      }
                    >
                      <ArrowBackIcon className="w-4 h-4" />
                    </React.Suspense>

                    <h4 className="font-body text-lg font-medium text-[#000000]/60">
                      {state}
                    </h4>
                  </div>
                ) : (
                  <h4 className="font-body text-lg font-medium text-[#000000]/60">
                    States
                  </h4>
                )}
              </div>
              <div
                className="p-4 flex flex-col gap-4 div max-h-[268px] overflow-auto"
                ref={contentInfoRef}
              >
                {state && stateCities
                  ? stateCities[state].map((city) => {
                      return (
                        <div
                          className="hover:bg-stroke/20 hover:cursor-pointer"
                          key={city.id}
                          onClick={() => {
                            setCity(city.id);
                            setCityName(city.city);
                            setState(null);
                            onCityClick(city.id);
                            const dialogCloseTrigger =
                              document.getElementById("dialogCloseTrigger");
                            dialogCloseTrigger?.click();
                          }}
                        >
                          {city.city}
                        </div>
                      );
                    })
                  : states?.map((state, index) => {
                      return (
                        <div
                          className="hover:bg-stroke/20 hover:cursor-pointer flex items-center justify-between"
                          key={index}
                          onClick={() => {
                            setState(state);
                            if (contentInfoRef.current) {
                              contentInfoRef.current.scrollTo(0, 0);
                            }
                          }}
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
          </div>
        </Dialog>
      </div>
    );
  }
);

RequestsFilter.displayName = "RequestsFilter";

export default RequestsFilter;
