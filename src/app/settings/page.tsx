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
import useCategory from "@/hooks/useCategory";
import useLocations from "@/hooks/useLocation";
import LocationSelector from "@/components/LocationSelector";
import Dialog from "@/components/ui/DialogPrimitive";
import CategorySelector from "@/components/CategorySelector";

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

  const [categories, flattenedCategories] = useCategory();
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  
  const [locations, flattenedLocations] = useLocations();
  const [selectedLocation, setSelectedLocation] = React.useState<number | null>(
    null
  );


  const [openLocationModal, setOpenLocationModal] = React.useState(false);
  const [openCategoryModal, setOpenCategoryModal] = React.useState(false);

  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
    }
  }, []);

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
      window.location.assign("/login");
    }
  }, []);

  React.useEffect(() => {
    const userDetails = window.localStorage.getItem("userDetails");
    if (userDetails) setUser(JSON.parse(userDetails).data);
  }, []);

  const onClickCityAdd = () => {
    if (selectedLocation && flattenedLocations) {
      if (preferences.selected_locations.find((x) => x === selectedLocation)) {
        return;
      }
      setPreferences({
        ...preferences,
        selected_locations: [
          ...preferences.selected_locations,
          selectedLocation,
        ],
      });
      setSelectedCities([
        ...selectedCities,
        flattenedLocations[selectedLocation - 1],
      ]);
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
    if (selectedCategory && flattenedCategories) {
      if (preferences.selected_categories.find((x) => x === selectedCategory)) {
        return;
      }
      setPreferences({
        ...preferences,
        selected_categories: [
          ...preferences.selected_categories,
          selectedCategory,
        ],
      });
      setSelectedSubCategories([
        ...selectedSubCategories,
        flattenedCategories[selectedCategory - 1],
      ]);
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
        window.location.assign("/");
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
        window.location.href = "/login";
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

        if (res.isError) {
          window.localStorage.removeItem("userDetails");
          window.location.href = "/login";
          return;
        }
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

          <div className="mt-4 w-full flex gap-6">
            <Dialog
              dialogTrigger={
                <div className="flex justify-between w-full max-w-xs rounded-lg border border-[#D9D9D9] p-3 bg-faded font-inter hover:cursor-pointer">
                  <input
                    value={
                      (selectedLocation &&
                        flattenedLocations &&
                        flattenedLocations[selectedLocation - 1].city) ||
                      "Select a City"
                    }
                    className={cn(
                      "w-full bg-faded hover:cursor-pointer text-[#000000]/60 text-[14px]",
                      selectedLocation && "font-body text-black text-[16px]"
                    )}
                    readOnly
                  />
                </div>
              }
              className="top-1/2 -translate-y-1/2 fixed left-1/2 -translate-x-1/2 z-[60]"
              open={openLocationModal}
              onOpenChange={setOpenLocationModal}
            >
              <LocationSelector
                setLocation={setSelectedLocation}
                setOpenLocationModal={setOpenLocationModal}
              />
            </Dialog>

            <Button
              variant="outlined2"
              className="py-[10px] px-6"
              onClick={onClickCityAdd}
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {flattenedLocations &&
              flattenedLocations
                .filter((location) => {
                  return preferences.selected_locations.includes(location.id);
                })
                .map((location) => {
                  return (
                    <div
                      key={location.id}
                      className="flex items-center gap-[10px] font-body text-body_2 text-black/70 rounded-2xl px-3 p-[6px] bg-faded"
                    >
                      {location.city}

                      <React.Suspense
                        fallback={
                          <div className="w-3 h-3 bg-stroke/60 animate-pulse"></div>
                        }
                      >
                        <CloseIcon
                          className="w-3 h-3 hover:cursor-pointer"
                          fontSize="small"
                          onClick={() => onClickdeleteCityTag(location)}
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
            <div className="w-full flex gap-6">
              <Dialog
                dialogTrigger={
                  <div className="flex justify-between w-full max-w-xs rounded-lg border border-[#D9D9D9] p-3 bg-faded font-inter hover:cursor-pointer">
                    <input
                      value={
                        (selectedCategory &&
                          flattenedCategories &&
                          flattenedCategories[selectedCategory - 1].name) ||
                        "Select a Category"
                      }
                      className={cn(
                        "w-full bg-faded hover:cursor-pointer text-[#000000]/60 text-[14px]",
                        selectedCategory && "font-body text-black text-[16px]"
                      )}
                      readOnly
                    />
                  </div>
                }
                className="top-1/2 -translate-y-1/2 fixed left-1/2 -translate-x-1/2 z-[60]"
                open={openCategoryModal}
                onOpenChange={setOpenCategoryModal}
              >
                <CategorySelector
                  setCategory={setSelectedCategory}
                  setOpenCategoryModal={setOpenCategoryModal}
                />
              </Dialog>

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
            {flattenedCategories &&
              flattenedCategories
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
