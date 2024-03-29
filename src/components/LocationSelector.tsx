"use client";

import { getCities } from "@/app/lib/city";
import { CityInterface, StateCitiesInterface } from "@/app/types";
import useLocations from "@/hooks/useLocation";
import React from "react";

const ChevronRightIcon = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);
const ArrowBackIcon = React.lazy(() => import("@mui/icons-material/ArrowBack"));

const LocationSelector = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    setLocation: React.Dispatch<React.SetStateAction<number | null>>;
    setOpenLocationModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
>(({ className, setLocation, setOpenLocationModal, ...props }, fowardref) => {
  const [selectedState, setSelectedState] = React.useState<string | null>(null);
  const [locations, flattenedLocations] = useLocations();

  const contentInfoRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white max-h-[500px] w-[80vw] max-w-[360px]">
      <div>
        <div className="px-4 pt-10 pb-4 border-b border-[#000000]/10 flex flex-col gap-8">
          <h3 className="font-headline text-headline_3 font-bold">
            Select Location
          </h3>
          {selectedState ? (
            <div
              className="flex gap-4 items-center hover:cursor-pointer"
              onClick={() => {
                setSelectedState(null);
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
                {selectedState}
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
          {selectedState && locations
            ? locations[selectedState]?.map((city) => {
                return (
                  <div
                    className="hover:bg-stroke/20 hover:cursor-pointer"
                    key={city.id}
                    onClick={() => {
                      setLocation(city.id);
                      setOpenLocationModal(false);
                    }}
                  >
                    {city.city}
                  </div>
                );
              })
            : locations &&
              Object.keys(locations)?.map((state, index) => {
                return (
                  <div
                    className="hover:bg-stroke/20 hover:cursor-pointer flex items-center justify-between"
                    key={index}
                    onClick={() => {
                      setSelectedState(state);
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
  );
});

LocationSelector.displayName = "LocationSelector";

export default LocationSelector;
