"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import {
  CategoryType,
  City,
  CityInterface,
  UserPreferencesType,
  UserType,
} from "../types";
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
import { cn } from "../lib/utils";
import { getPreferences, logoutUser } from "../lib/user";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getCities } from "../lib/city";
import { getCategories } from "../lib/category";
import updateUserPreference from "../lib/user/updateUserPreference";

const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));
const ToggleOffIcon = React.lazy(() => import("@mui/icons-material/ToggleOff"));
const ToggleOnIcon = React.lazy(() => import("@mui/icons-material/ToggleOn"));

type Props = {};

const SettingsPage = (props: Props) => {
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<CityInterface | null>(null);
  const [selectedCities, setSelectedCities] = React.useState<CityInterface[]>(
    []
  );
  const [category, setCategory] = React.useState<string | null>(null);
  const [subCategory, setSubCategory] = React.useState<CategoryType | null>(
    null
  );
  const [selectedSubCategories, setSelectedSubCategories] = React.useState<
    CategoryType[]
  >([]);
  const [notification, setNotification] = React.useState(false);
  const [myRequestVisibility, setMyRequestVisibily] = React.useState<
    "PUBLIC" | "AGENTS"
  >("PUBLIC");
  const [myResponsestVisibility, setMyResponsesVisibily] = React.useState<
    "PUBLIC" | "PRIVATE"
  >("PUBLIC");
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [user, setUser] = React.useState<UserType | null>(null);
  const [preferences, setPreferences] = React.useState<UserPreferencesType>({
    all_categories: false,
    all_locations: false,
    created_at: "",
    id: 0,
    selected_categories: [],
    selected_locations: [],
    updated_at: "",
    user_id: 0,
  });

  const [stateCities, setStateCities] = React.useState<{
    [id: string]: CityInterface[];
  } | null>(null);
  const [categories, setCategories] = React.useState<{
    [id: string]: CategoryType[];
  } | null>(null);

  const [saving, setSaving] = React.useState(false);

  const states = stateCities ? Object.keys(stateCities) : null;
  let citiesValues: CityInterface[] = [];

  if (states && stateCities) {
    states?.map((statekey) => {
      stateCities[statekey].forEach((cityValue) => {
        citiesValues.push(cityValue);
      });
    });
  }

  const categoryKeys = categories ? Object.keys(categories) : null;
  let categoriesValues: CategoryType[] = [];

  if (categoryKeys && categories) {
    categoryKeys?.map((categorykey) => {
      categories[categorykey].forEach((categoryValue) => {
        categoriesValues.push(categoryValue);
      });
    });
  }

  React.useEffect(() => {
    const userDetails = window.localStorage.getItem("userDetails");
    const token = window.localStorage.getItem("token");
    if (userDetails && token) {
      (async () => {
        const res: UserPreferencesType = await getPreferences(
          token,
          JSON.parse(userDetails).data.id
        );

        setPreferences(res);
      })();
    } else {
      window.location.href = "/login";
    }
  }, []);

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

  React.useEffect(() => {
    const categoriesIntermediate = window.localStorage.getItem("categories");
    if (!categoriesIntermediate) {
      (async () => {
        try {
          const categoriesRes = await getCategories();
          setCategories(categoriesRes);
          window.localStorage.setItem(
            "categories",
            JSON.stringify(categoriesRes)
          );
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      setCategories(JSON.parse(categoriesIntermediate));
    }
  }, []);

  React.useEffect(() => {
    const userDetails = window.localStorage.getItem("userDetails");
    if (userDetails) setUser(JSON.parse(userDetails).data);
  }, []);

  const onClickCityAdd = () => {
    if (city) {
      if (preferences.selected_locations.find((x) => x === city.id)) {
        return;
      }
      setPreferences({
        ...preferences,
        selected_locations: [...preferences.selected_locations, city.id],
      });
      setSelectedCities([...selectedCities, city]);
    }
  };

  const onClickdeleteCityTag = (e: CityInterface) => {
    setPreferences({
      ...preferences,
      selected_locations: preferences.selected_locations.filter(
        (x) => x != e.id
      ),
    });
    setSelectedCities(selectedCities.filter((x) => x.id != e.id));
  };

  const onClickCategoryTypeAdd = () => {
    if (subCategory) {
      if (preferences.selected_categories.find((x) => x === subCategory.id)) {
        return;
      }
      setPreferences({
        ...preferences,
        selected_categories: [
          ...preferences.selected_categories,
          subCategory.id,
        ],
      });
      setSelectedSubCategories([...selectedSubCategories, subCategory]);
    }
  };

  const onClickdeleteCategoryTag = (e: CategoryType) => {
    setPreferences({
      ...preferences,
      selected_categories: preferences.selected_categories.filter(
        (x) => x != e.id
      ),
    });
    setSelectedSubCategories(selectedSubCategories.filter((x) => x.id != e.id));
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

  const onClickSave = async () => {
    setSaving(true);
    try {
      const token = window.localStorage.getItem("token");
      const userDetails = window.localStorage.getItem("userDetails");
      if (!token && !userDetails) {
        window.location.replace("/login");
      } else {
        const data = {
          user_id: JSON.parse(userDetails as string).data.id,
          all_categories:
            preferences.selected_categories.length > 0 ? false : true,
          selected_categories: [...preferences.selected_categories],
          all_locations:
            preferences.selected_locations.length > 0 ? false : true,
          selected_locations: [...preferences.selected_locations],
        };

        const res = await updateUserPreference(token as string, data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mt-10 md:mt-14 md:ml-16 md:mr-[100px] mb-10 md:mb-20">
      <div className="w-full flex justify-between items-center px-5 md:px-0">
        <div className="bg-[#48466D] font-headline text-headline_2 text-white font-bold w-fit">
          Settings
        </div>

        <div
          className="flex items-center gap-1 hover:cursor-pointer"
          onClick={onClickSignOut}
        >
          {loggingOut ? (
            <LoadingSpinner className="fill-primary text-faded h-4 w-4" />
          ) : (
            <Image
              src="/images/icons/logout.png"
              height={24}
              width={24}
              alt="logout"
            />
          )}
          {loggingOut ? (
            <div className="text-primary font-body text-title_2 font-medium">
              Signing out
            </div>
          ) : (
            <div className="text-primary font-body text-title_2 font-medium">
              Sign out
            </div>
          )}
        </div>
      </div>

      {/* profile */}
      <div className="mt-8 md:mt-6 p-5 md:px-4 md:py-6 bg-white">
        <div className="font-headline text-headline_3 font-bold text-secondary">
          Profile
        </div>

        {user && (
          <div className="mt-4 md:mt-2 font-body text-body_1 text-[#000000]/60">
            {user.email}
          </div>
        )}

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
              locations={states}
              setLocation={setState}
            />

            <div className="w-full flex gap-6">
              <OptionSelect
                selectType="CITY"
                locations={state && stateCities ? stateCities[state] : null}
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

          <div className="flex flex-wrap gap-3 mt-4">
            {citiesValues &&
              citiesValues
                .filter((city) => {
                  return preferences.selected_locations.includes(city.id);
                })
                .map((city) => {
                  return (
                    <div
                      key={city.id}
                      className="flex items-center gap-[10px] font-body text-body_2 text-black/70 rounded-2xl px-3 p-[6px] bg-faded"
                    >
                      {city.city}

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
              categories={categoryKeys}
              setCategory={setCategory}
            />

            <div className="w-full flex gap-6">
              <OptionSelect
                selectType="SUBCATEGORY"
                subCategories={
                  categories && category ? categories[category] : null
                }
                setSubCategory={setSubCategory}
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
            {categoriesValues &&
              categoriesValues
                .filter((categoryValue) => {
                  return preferences.selected_categories.includes(
                    categoryValue.id
                  );
                })
                .map((subCategoryItem, index) => {
                  return (
                    <div
                      key={subCategoryItem.id}
                      className="flex items-center gap-[10px] font-body text-body_2 text-black/70 rounded-2xl px-3 p-[6px] bg-faded"
                    >
                      {subCategoryItem.name}

                      <React.Suspense
                        fallback={
                          <div className="w-3 h-3 bg-stroke/60 animate-pulse"></div>
                        }
                      >
                        <CloseIcon
                          className="w-3 h-3 hover:cursor-pointer"
                          fontSize="small"
                          onClick={() =>
                            onClickdeleteCategoryTag(subCategoryItem)
                          }
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

          {saving ? (
            <div className="font-body text-title_3 font-medium text-primary hover:cursor-pointer flex items-center gap-1">
              <LoadingSpinner className="h-4 w-4 text-white fill-primary" />
              SAVING CHANGES
            </div>
          ) : (
            <div
              className="font-body text-title_3 font-medium text-primary hover:cursor-pointer"
              onClick={onClickSave}
            >
              SAVE CHANGES
            </div>
          )}
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

type OptionSelectI =
  | {
      selectType: "STATE";
      setLocation: React.Dispatch<React.SetStateAction<string | null>>;
      locations: string[] | null;
    }
  | {
      selectType: "CITY";
      setLocation: React.Dispatch<React.SetStateAction<CityInterface | null>>;
      locations: CityInterface[] | null;
    }
  | {
      selectType: "CATEGORY";
      setCategory: React.Dispatch<React.SetStateAction<string | null>>;
      categories: string[] | null;
    }
  | {
      selectType: "SUBCATEGORY";
      setSubCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
      subCategories: CategoryType[] | null;
    };

const OptionSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select> & OptionSelectI
>(({ children, ...props }, fowardref) => {
  return (
    <Select
      onValueChange={(e) => {
        if (props.selectType === "STATE") {
          props.setLocation(e);
        }
        if (props.selectType === "CITY") {
          props.setLocation(JSON.parse(e));
        }
        if (props.selectType === "CATEGORY") {
          props.setCategory(e);
        }
        if (props.selectType === "SUBCATEGORY") {
          props.setSubCategory(JSON.parse(e));
        }
      }}
    >
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
              (props.selectType === "STATE" && "Select State") ||
              (props.selectType === "CITY" && "City") ||
              (props.selectType === "CATEGORY" && "Category") ||
              (props.selectType === "SUBCATEGORY" && "Type")
            }
            className="placeholder:font-body placeholder:text-body placeholder:text-body_1 placeholder:text-black/60 font-body"
          />
        </div>
      </SelectTrigger>

      <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
        <SelectGroup>
          <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3">
            {props.selectType === "STATE" && "Select a State"}
            {props.selectType === "CITY" && "Select a City"}
            {props.selectType === "CATEGORY" && "Category"}
            {props.selectType === "SUBCATEGORY" && "Type"}
          </SelectLabel>
          {props.selectType === "STATE" &&
            props.locations &&
            props.locations.map((location, index) => {
              return (
                <SelectItem
                  value={location}
                  key={index}
                  className="hover:cursor-pointer font-body text-title_2 pl-2"
                >
                  {location}
                </SelectItem>
              );
            })}
          {props.selectType === "CATEGORY" &&
            props.categories &&
            props.categories.map((category, index) => {
              return (
                <SelectItem
                  value={category}
                  key={index}
                  className="hover:cursor-pointer font-body text-title_2 pl-2"
                >
                  {category}
                </SelectItem>
              );
            })}
          {props.selectType === "CITY" &&
            props.locations &&
            props.locations.map((city) => {
              return (
                <SelectItem
                  value={JSON.stringify(city)}
                  key={city.id}
                  className="hover:cursor-pointer font-body text-title_2 pl-2"
                >
                  {city.city}
                </SelectItem>
              );
            })}
          {props.selectType === "SUBCATEGORY" &&
            props.subCategories &&
            props.subCategories.map((subCategories) => {
              return (
                <SelectItem
                  value={JSON.stringify(subCategories)}
                  key={subCategories.id}
                  className="hover:cursor-pointer font-body text-title_2 pl-2"
                >
                  {subCategories.name}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

OptionSelect.displayName = "OptionSelect";
