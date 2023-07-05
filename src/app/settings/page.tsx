"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import { City } from "../types";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/Menubar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { statesConfig } from "@/config.ts/cities";
import { cn } from "../lib/utils";

const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));

type Props = {};

const SettingsPage = (props: Props) => {
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<string | null>(null);
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);

  const states = Object.keys(statesConfig);

  const onClickCityAdd = () => {
    if (city) {
      if (selectedCities.find((x) => x === city)) {
        return;
      }
      setSelectedCities([...selectedCities, city]);
    }
  };

  const onClickdeleteCityTag = (e: string) => {
    setSelectedCities(selectedCities.filter((x) => x != e));
  };

  return (
    <main className="mt-10 md:mt-14 md:ml-16 md:mr-[100px] mb-10 md:mb-20">
      <div className="w-full flex justify-between items-center px-5 md:px-0">
        <div className="bg-[#48466D] font-headline text-headline_2 text-white font-bold w-fit">
          Settings
        </div>

        <div className="flex gap-1">
          <Image
            src="/images/icons/logout.png"
            height={24}
            width={24}
            alt="logout"
          />
          <div className="text-primary font-body text-title_2 font-medium hover:cursor-pointer">
            Sign out
          </div>
        </div>
      </div>

      {/* profile */}
      <div className="mt-8 md:mt-6 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-headline text-headline_3 font-bold text-secondary">
          Profile
        </div>

        <div className="mt-4 md:mt-2 font-body text-body_1 text-[#000000]/60">
          Example@email.com
        </div>

        <div className="flex justify-between items-center w-full mt-7 md:mt-6">
          <div className="font-body text-title_1 font-medium text-[#000000] hover:cursor-pointer">
            Change Password
          </div>

          <Image
            src="/images/icons/expand_more_change_password.png"
            height={24}
            width={24}
            alt="change password"
            className="md:hidden"
          />
        </div>
      </div>

      <div className="mt-6 md:mt-4 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-headline text-headline_3 font-bold text-secondary">
          Customize Feed
        </div>

        <div>
          <div className="mt-6">
            <span className="font-body text-title_2 font-medium text-black">
              Preferred Location
            </span>
            <span className="font-body text-body_2 text-secondary ml-4">
              Default
            </span>
          </div>

          <div className="mt-4 w-full flex flex-col md:flex-row gap-4">
            {/* <select
              name="state"
              id="state_select_id"
              className="w-full py-2 px-2"
            >
              <option value="Rivers">Rivers</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
            </select> */}

            <LocationSelect
              locationType="STATE"
              locations={states}
              location={state}
              setLocation={setState}
            />

            <div className="w-full flex gap-6">
              {/* <select name="city" id="city_select_id" className="w-full">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select> */}

              <LocationSelect
                locationType="CITY"
                locations={state ? statesConfig[state] : null}
                location={city}
                setLocation={setCity}
              />

              <Button
                variant="outlined2"
                className="py-[10px] px-6"
                onClick={onClickCityAdd}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 h-[30px]">
            {selectedCities.map((city, index) => {
              return (
                <div
                  key={`city${index}`}
                  className="flex items-center gap-[10px] font-body text-body_2 text-black/70 rounded-2xl px-3 p-[6px] bg-faded"
                >
                  {city}

                  <React.Suspense
                    fallback={
                      <div className="w-3 h-3 bg-stroke/60 animate-pulse"></div>
                    }
                  >
                    <CloseIcon
                      className="w-3 h-3 hover:cursor-pointer"
                      fontSize="small"
                      onClick={() => onClickdeleteCityTag(city)}
                    />
                  </React.Suspense>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden w-full mt-6 border-t border-[#000000]/10"></div>

        <div>
          <div className="mt-6">
            <span className="font-body text-title_2 font-medium text-black">
              Preferred Category
            </span>
          </div>

          <div className="mt-4 w-full flex flex-col md:flex-row gap-4">
            <select
              name="category"
              id="category_select_id"
              className="w-full py-2 px-2"
            >
              <option value="Products">Products</option>
              <option value="Services">Services</option>
              <option value="Accomodation">Accomodation</option>
            </select>

            <div className="w-full flex gap-6">
              <select name="type" id="types_select_id" className="w-full">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>

              <Button variant="outlined2" className="py-[10px] px-6">
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap mt-4">
            <div className="bg-background rounded-2xl px-3 py-1 flex gap-1 w-fit">
              <span className="font-body text-secondary text-body_2">
                Fashion
              </span>
              <span className="font-body text-[#000000] text-body_2">x</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-4 p-5 md:px-4 md:py-6 bg-white">
        <div className="w-full flex justify-between">
          <div className="font-headline text-headline_3 font-bold text-secondary">
            Visibility
          </div>

          <div className="font-body text-title_3 font-medium text-primary hover:cursor-pointer">
            SAVE CHANGES
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="font-body text-title_2 font-medium text-black">
            My Request
          </div>

          <div className="flex gap-10 mt-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="visibility"
                id="public"
                value="public"
                defaultChecked
              />
              <label
                htmlFor="public"
                className="font-body text-title_3 font-medium text-black"
              >
                Public
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                name="visibility"
                id="agents"
                value="agents"
              />
              <label
                htmlFor="agents"
                className="font-body text-title_3 font-medium text-black"
              >
                Only Verified Agents
              </label>
            </div>
          </div>

          <div className="mt-4 font-body text-title_3 text-[#000000]/60 max-w-[498px]">
            *Public - everyone can view and respond to your request. *Only
            verified Agents - Only users we have verified on the category of the
            request can view and respond to it (feature not yet available in
            your country)
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="font-body text-title_2 font-medium text-black">
            My Responses
          </div>

          <div className="flex gap-10 mt-4">
            <div className="flex gap-2">
              <input
                type="radio"
                name="responses"
                id="public"
                value="public"
                defaultChecked
              />
              <label
                htmlFor="public"
                className="font-body text-title_3 font-medium text-black"
              >
                Public
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                name="responses"
                id="private"
                value="private"
              />
              <label
                htmlFor="private"
                className="font-body text-title_3 font-medium text-black"
              >
                Private
              </label>
            </div>
          </div>

          <div className="mt-4 font-body text-title_3 text-[#000000]/60 max-w-[498px]">
            *Public - everyone can view your response and contact. *Private -
            only the user with the request can get to see your response and
            contact you if desired
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-4 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-head font-bold text-headline_3 text-secondary">
          Others
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000]">
          Delete Account
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000]">
          Email Notification on Preferred Feeds
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000]">
          Write Us Feedback
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;

interface LocationSelectorI {
  city: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  setCity: React.Dispatch<React.SetStateAction<string | null>>;
  statesConfig: Record<string, City[]>;
}

const LocationSelector = React.forwardRef<
  React.ElementRef<typeof Menubar>,
  React.ComponentPropsWithoutRef<typeof Menubar> & LocationSelectorI
>(
  (
    { className, children, statesConfig, city, setState, setCity, ...props },
    fowardref
  ) => {
    const states = Object.keys(statesConfig);

    return (
      <Menubar className={className} ref={fowardref} {...props}>
        <MenubarMenu>
          <MenubarTrigger className="flex items-center justify-between w-full px-4 py-3 border border-grey rounded">
            <div className="flex items-center gap-4">
              <span className="font-body text-body_1 text-black/60">
                {city || "Select"}
              </span>
            </div>

            <React.Suspense
              fallback={
                <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
              }
            >
              <KeyboardArrowDownIcon className="text-[#828080]" />
            </React.Suspense>
          </MenubarTrigger>

          <MenubarContent className="min-w-[150px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity] z-30 max-h-[50vh] overflow-auto">
            {states.sort().map((state, index) => {
              return (
                <MenubarSub key={index}>
                  <MenubarSubTrigger className="max-w-[200px] group font-body text-special leading-none rounded flex items-center justify-between h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-stroke/60 data-[highlighted]:bg-gradient-to-br data-[disabled]:pointer-events-none">
                    {state}
                    <React.Suspense
                      fallback={
                        <div className="w-5 h-5 bg-stroke/60 animate-pulse"></div>
                      }
                    >
                      {/* <ChevronRightIcon className="w-5 h-5 text-[#000000]/80" /> */}
                    </React.Suspense>
                  </MenubarSubTrigger>

                  <MenubarSubContent className="min-w-[150px] bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity] z-40 ax-h-[50vh] overflow-auto">
                    {statesConfig[state]
                      .sort()
                      .reverse()
                      .map((city) => {
                        return (
                          <MenubarItem
                            key={city.geonameid}
                            className="px-1 font-body text-special hover:cursor-default hover:bg-stroke/60 relative select-none outline-none data-[state=open]:bg-stroke/60 data-[highlighted]:bg-gradient-to-br data-[disabled]:pointer-events-none"
                            onClick={() => {
                              setState(state);
                              setCity(city.name);
                            }}
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
      </Menubar>
    );
  }
);

LocationSelector.displayName = "LocationSelector";

interface LocationSelectI {
  location: string | null;
  setLocation: React.Dispatch<React.SetStateAction<string | null>>;
  locations: string[] | City[] | null;
  locationType: "STATE" | "CITY";
}

const LocationSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select> & LocationSelectI
>(
  (
    { children, location, setLocation, locations, locationType, ...props },
    fowardref
  ) => {
    return (
      <Select onValueChange={(e) => setLocation(e)}>
        <SelectTrigger
          className={cn(
            "flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
          )}
          aria-label="Sub Category"
          icon={
            <React.Suspense
              fallback={
                <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
              }
            >
              <KeyboardArrowDownIcon className="text-[#828080]" />
            </React.Suspense>
          }
        >
          <div className="flex items-center gap-4">
            <SelectValue
              placeholder="Select type"
              className="placeholder:text-body placeholder:text-body_1 placeholder:text-black/60"
            />
          </div>
        </SelectTrigger>

        <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
          <SelectGroup>
            <SelectLabel>
              {locationType === "STATE" && "Select a State"}
              {locationType === "CITY" && "Select a City"}
            </SelectLabel>
            {locations?.sort().map((locationItem, index) => {
              if (typeof locationItem === "string") {
                return (
                  <SelectItem
                    value={locationItem}
                    key={index}
                    className="hover:cursor-pointer"
                  >
                    {locationItem}
                  </SelectItem>
                );
              } else
                return (
                  <SelectItem
                    value={locationItem.name}
                    key={locationItem.geonameid}
                    className="hover:cursor-pointer"
                  >
                    {locationItem.name}
                  </SelectItem>
                );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

LocationSelect.displayName = "LocationSelect";
