"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import { City } from "../types";
import * as Toggle from "@radix-ui/react-toggle";

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
import { sidebarConfig1 } from "@/config.ts/sidebarConfig";
import { logoutUser } from "../lib/user";

const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));
const ToggleOffIcon = React.lazy(() => import("@mui/icons-material/ToggleOff"));
const ToggleOnIcon = React.lazy(() => import("@mui/icons-material/ToggleOn"));

type Props = {};

const SettingsPage = (props: Props) => {
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<string | null>(null);
  const [selectedCities, setSelectedCities] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string | null>(null);
  const [categoryType, setCategoryType] = React.useState<string | null>(null);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = React.useState<
    string[]
  >([]);
  const [notification, setNotification] = React.useState(false);
  const [myRequestVisibility, setMyRequestVisibily] = React.useState<
    "PUBLIC" | "AGENTS"
  >("PUBLIC");
  const [myRsponsestVisibility, setMyResponsesVisibily] = React.useState<
    "PUBLIC" | "PRIVATE"
  >("PUBLIC");
  const [loggingOut, setLoggingOut] = React.useState(false);

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

  const onClickCategoryTypeAdd = () => {
    if (categoryType) {
      if (selectedCategoryTypes.find((x) => x === categoryType)) {
        return;
      }
      setSelectedCategoryTypes([...selectedCategoryTypes, categoryType]);
    }
  };

  const onClickdeleteCategoryTag = (e: string) => {
    setSelectedCategoryTypes(selectedCategoryTypes.filter((x) => x != e));
  };

  const onClickSignOut = async () => {
    setLoggingOut(true);
    try {
      const token = window.localStorage.getItem("token");

      if (token) {
        const res = await logoutUser(token);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userDetails");
        setLoggingOut(false);
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      setLoggingOut(false);
    }
  };

  const categories =
    sidebarConfig1
      .filter((item) => item.children)
      .map((item) => item.children)[0]
      ?.map((item) => item.title) || null;

  const categoryTypes =
    (category
      ? sidebarConfig1
          .filter((item) => item.children)[0]
          .children?.filter((item) => item.title === category)[0]
          .subChildren?.map((item) => item.title)
      : null) || null;

  return (
    <main className="mt-10 md:mt-14 md:ml-16 md:mr-[100px] mb-10 md:mb-20">
      <div className="w-full flex justify-between items-center px-5 md:px-0">
        <div className="bg-[#48466D] font-headline text-headline_2 text-white font-bold w-fit">
          Settings
        </div>

        <div
          className="flex gap-1 hover:cursor-pointer"
          onClick={onClickSignOut}
        >
          <Image
            src="/images/icons/logout.png"
            height={24}
            width={24}
            alt="logout"
          />
          <div className="text-primary font-body text-title_2 font-medium">
            Sign{loggingOut && "ing"} out
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
            <OptionSelect
              selectType="STATE"
              options={states}
              selectedOption={state}
              setOption={setState}
            />

            <div className="w-full flex gap-6">
              <OptionSelect
                selectType="CITY"
                options={state ? statesConfig[state].reverse() : null}
                selectedOption={city}
                setOption={setCity}
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

          <div className="flex flex-wrap gap-3 mt-4">
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
            <OptionSelect
              selectType="CATEGORY"
              options={categories}
              selectedOption={category}
              setOption={setCategory}
            />

            <div className="w-full flex gap-6">
              <OptionSelect
                selectType="TYPE"
                options={categoryTypes}
                selectedOption={categoryType}
                setOption={setCategoryType}
              />

              <Button
                variant="outlined2"
                className="py-[10px] px-6"
                onClick={onClickCategoryTypeAdd}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {selectedCategoryTypes.map((categoryItem, index) => {
              return (
                <div
                  key={`categoryItem${index}`}
                  className="flex items-center gap-[10px] font-body text-body_2 text-black/70 rounded-2xl px-3 p-[6px] bg-faded"
                >
                  {categoryItem}

                  <React.Suspense
                    fallback={
                      <div className="w-3 h-3 bg-stroke/60 animate-pulse"></div>
                    }
                  >
                    <CloseIcon
                      className="w-3 h-3 hover:cursor-pointer"
                      fontSize="small"
                      onClick={() => onClickdeleteCategoryTag(categoryItem)}
                    />
                  </React.Suspense>
                </div>
              );
            })}
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

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000] hover:cursor-pointer">
          Delete Account
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <div className="font-body font-medium text-title_2 text-[#000000]">
            Email Notification on Preferred Feeds
          </div>
          <Toggle.Root
            aria-label="Toggle italic"
            className="hover:cursor-pointer"
          >
            <React.Suspense
              fallback={
                <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
              }
            >
              {notification ? (
                <ToggleOnIcon onClick={() => setNotification(!notification)} />
              ) : (
                <ToggleOffIcon onClick={() => setNotification(!notification)} />
              )}
            </React.Suspense>
          </Toggle.Root>
        </div>

        <div className="font-body font-medium text-title_2 mt-4 text-[#000000] hover:cursor-pointer">
          Write Us Feedback
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;

interface OptionSelectI {
  selectedOption: string | null;
  setOption: React.Dispatch<React.SetStateAction<string | null>>;
  options: string[] | City[] | null;
  selectType: "STATE" | "CITY" | "CATEGORY" | "TYPE";
}

const OptionSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select> & OptionSelectI
>(
  (
    { children, selectedOption, setOption, options, selectType, ...props },
    fowardref
  ) => {
    return (
      <Select onValueChange={(e) => setOption(e)}>
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
              placeholder={
                (selectType === "STATE" && "Select State") ||
                (selectType === "CITY" && "City") ||
                (selectType === "CATEGORY" && "Category") ||
                (selectType === "TYPE" && "Type")
              }
              className="placeholder:font-body placeholder:text-body placeholder:text-body_1 placeholder:text-black/60 font-body"
            />
          </div>
        </SelectTrigger>

        <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
          <SelectGroup>
            <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3">
              {selectType === "STATE" && "Select a State"}
              {selectType === "CITY" && "Select a City"}
              {selectType === "CATEGORY" && "Category"}
              {selectType === "TYPE" && "Type"}
            </SelectLabel>
            {options?.sort().map((optionsItem, index) => {
              if (typeof optionsItem === "string") {
                return (
                  <SelectItem
                    value={optionsItem}
                    key={index}
                    className="hover:cursor-pointer font-body text-title_2 pl-2"
                  >
                    {optionsItem}
                  </SelectItem>
                );
              } else
                return (
                  <SelectItem
                    value={optionsItem.name}
                    key={optionsItem.geonameid}
                    className="hover:cursor-pointer font-body text-title_2 pl-2"
                  >
                    {optionsItem.name}
                  </SelectItem>
                );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

OptionSelect.displayName = "OptionSelect";
