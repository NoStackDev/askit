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
import useLocations from "@/hooks/useLocation";
import LocationSelector from "./LocationSelector";

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
    const [openLocationModal, setOpenLocationModal] = React.useState(false);
    const [locations, flattenedLocations] = useLocations();
    const contentInfoRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
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

      if (city) {
        onCityClick(city);
      }
    }, [city]);

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
            {city && flattenedLocations
              ? flattenedLocations[city - 1].city
              : "whole country"}
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
          open={openLocationModal}
          onOpenChange={setOpenLocationModal}
        >
          <LocationSelector
            setLocation={setCity}
            setOpenLocationModal={setOpenLocationModal}
          />
        </Dialog>
      </div>
    );
  }
);

RequestsFilter.displayName = "RequestsFilter";

export default RequestsFilter;
