"use client";

import React from "react";
import Topbar from "@/components/Topbar";
import Image from "next/image";
import Button from "@/components/ui/Button";
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
import { statesConfig } from "@/config.ts/cities";
import {
  City,
  CityInterface,
  StateCitiesInterface,
  UserType,
} from "@/app/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { cn } from "@/app/lib/utils";
import { useAuthContext } from "@/app/context/authContext";
import { redirect } from "next/navigation";
import { loginUser, updateUser } from "@/app/lib/user";
import { useGlobalContext } from "@/app/context/Store";
import getUser from "@/app/lib/user/getUser";
import { getCities } from "@/app/lib/city";

const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);

const ProfileInfo = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { userDetails?: UserType | null }
>(({ className, userDetails, ...props }, forwardRef) => {
  const [username, setUsername] = React.useState<string>(
    userDetails?.name ? userDetails.name : ""
  );
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<number | null>(null);
  const [cityName, setCityName] = React.useState<string | null>(null);
  const [about, setAbout] = React.useState<string>(
    userDetails ? userDetails.about : ""
  );
  const [businessAddr, setBusinessAddr] = React.useState<string>(
    userDetails?.business_addr ? userDetails.business_addr : ""
  );
  const [facebookLink, setFacebookLink] = React.useState<string>(
    userDetails?.facebook_link ? userDetails.facebook_link : ""
  );
  const [instagramLink, setInstagramLink] = React.useState<string>(
    userDetails?.instagram_link ? userDetails.instagram_link : ""
  );
  const [whatsppNum, setWhatsappNum] = React.useState<string>(
    userDetails?.whatsapp_num ? userDetails.whatsapp_num : ""
  );
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [imageBase64, setImageBase64] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const [imageFile, setImageFile] = React.useState<FileList>();
  const [stateCities, setStateCities] = React.useState<{
    [id: string]: CityInterface[];
  } | null>(null);
  const [isUpdatingUser, setIsUpdatingUser] = React.useState(false);

  const { setToken, user: authUser, setUser: setAuthUser } = useGlobalContext();
  const { isLoading, isOnboarding, dispatch } = useAuthContext();

  const profilePicRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       if (authUser?.authEmail && authUser.authPassword) {
  //         const tokenRes = await loginUser({
  //           email: authUser?.authEmail,
  //           password: authUser?.authPassword,
  //         });

  //         setToken(tokenRes.token);
  //         window.localStorage.setItem("token", tokenRes.token);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

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

  const onProfilePicClick = () => {
    if (profilePicRef.current) {
      profilePicRef.current.click();
    }
  };

  const onProfilePicInputChange = () => {
    if (profilePicRef.current) {
      if (profilePicRef.current.files) {
        setImageUrl(URL.createObjectURL(profilePicRef.current.files[0]));
        const reader = new FileReader();
        reader.readAsDataURL(profilePicRef.current.files[0]);
        reader.onload = () => {
          setImageBase64(reader.result);
        };
        setImageFile(profilePicRef.current.files);
      }
    }
  };

  const onUpdateClick = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
      return;
    }

    try {
      setIsUpdatingUser(true);
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${JSON.parse(token)}`);

      const data = new FormData();
      data.append("name", username);
      data.append("about", about);
      data.append("business_addr", businessAddr);
      data.append("facebook_link", facebookLink);
      data.append("whatsapp_num", whatsppNum);
      data.append("instagram_link", instagramLink);
      if (city) {
        data.append("location_id", city.toString());
      }

      if (imageFile) {
        data.append("profile_img", imageFile[0], imageFile[0].name);
      }

      const updatedUser = await updateUser(headers, data);

      if (updatedUser) {
        window.localStorage.setItem("userDetails", JSON.stringify(updatedUser));
        setIsUpdatingUser(false);
      } else {
        setIsUpdatingUser(false);
      }
    } catch (err) {
      console.log(err);
      setIsUpdatingUser(false);
    }
  };

  const onSaveClick = async () => {
    try {
      if (authUser && authUser.authEmail && authUser.authPassword) {
        dispatch({ type: "UPDATING" });
        const loginData = await loginUser({
          email: authUser.authEmail,
          password: authUser.authPassword,
        });

        if (loginData.token) {
          setToken(loginData.token);
          window.localStorage.setItem("token", loginData.token);
          const headers = new Headers();
          headers.append("Accept", "application/json");
          headers.append("Authorization", `Bearer ${loginData.token}`);

          const data = new FormData();
          data.append("about", about);
          data.append("business_addr", businessAddr);
          data.append("facebook_link", facebookLink);
          data.append("whatsapp_num", whatsppNum);
          data.append("instagram_link", instagramLink);
          if (city) {
            data.append("location_id", city.toString());
          }

          if (imageFile) {
            data.append("profile_img", imageFile[0], imageFile[0].name);
          }

          const updatedUser = await updateUser(headers, data);

          if (updatedUser) {
            window.localStorage.setItem(
              "userDetails",
              JSON.stringify(updatedUser)
            );
            setAuthUser(null);
            window.location.assign("/");
          } else {
            window.location.assign("/");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickSkip = () => {
    window.location.href = "/";
  };

  return (
    <main
      className={cn(
        "mt-4 md:mt-10 md:mx-[100px] bg-white md:bg-background flex justify-center items-center mb-10 md:mb-20",
        !isOnboarding && "mt-0 pt-2",
        className
      )}
      ref={forwardRef}
    >
      <div className="w-full max-w-[700px] bg-white">
        {/* topbar  */}
        {isOnboarding ? (
          <div
            className={cn(
              "relative flex items-center justify-center px-[22px] py-[18px]",
              isOnboarding && "justify-start md:justify-center"
            )}
          >
            <div
              className={cn(
                "font-headline text-headline_2 justify-self-center font-bold text-secondary"
              )}
            >
              Setup your profile
            </div>

            {isOnboarding ? (
              <Button
                variant={"outlined2"}
                className="absolute right-[0px] -translate-x-5 top-1/2 -translate-y-1/2 w-fit h-fit flex items-center gap-1 font-body text-title_2 py-1 px-4 font-medium text-primary"
                onClick={onClickSkip}
              >
                Skip
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="w-full flex justify-between px-5 mt-5">
            <div className="bg-[#48466D] text-white p-[2px] font-headline text-headline_3 font-bold">
              Edit Profile
            </div>
            <Button
              variant={"outlined2"}
              className="font-body text-[14px] px-3"
              onClick={onUpdateClick}
            >
              Sav{isUpdatingUser ? "ing" : "e"} Changes
            </Button>
          </div>
        )}

        <div className="flex flex-col justify-center items-center px-5 md:px-[92px]">
          {/* onboard welcome */}
          {isOnboarding ? (
            <>
              <div className="mt-6 md:mt-6 text-primary font-body text-title_2 md:text-title_1 font-medium">
                Hi Username, Nice to have you onboard!
              </div>

              <div className="mt-4 font-body text-body_2 text-center">
                By completing your profile with relevant information and
                showcasing your skills, you will increase your chances of
                attracting more clients when responding to requests.
              </div>
            </>
          ) : null}

          <div className="flex flex-col justify-center items-center mt-6 md:mt-10 gap-2">
            <div className="font-body font-medium text-title_3 text-[#000000]">
              Profile Picture
            </div>

            <div
              className={cn(
                "border rounded-full border-stroke p-5 hover:cursor-pointer w-24 h-24 flex justify-center items-center",
                imageBase64 && "p-0"
              )}
              onClick={onProfilePicClick}
            >
              {imageBase64 ? (
                <Image
                  src={imageUrl}
                  height={82}
                  width={82}
                  alt="profile pic"
                  className="hover:cursor-pointer rounded-full w-[82px] h-[82px]"
                />
              ) : (
                <Image
                  src="/images/icons/person.png"
                  height={40}
                  width={40}
                  alt="profile pic"
                  className="hover:cursor-pointer rounded-full"
                />
              )}

              <input
                type="file"
                name="profilcPic"
                id="profilePic"
                className="opacity-0 w-0 h-0 fixed bottom-0"
                ref={profilePicRef}
                onChange={onProfilePicInputChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>

            <div className="font-body text-special font-light">
              JPeg or PNG file only
            </div>
          </div>

          {!isOnboarding && (
            <div className="w-full flex flex-col gap-1 mt-5">
              <div className="self-start font-body font-medium text-title_3">
                Your name
              </div>
              <input
                type="text"
                value={username}
                className="w-full font-body text-body_1 text-[#000000] py-2 px-3 border border-grey rounded-xl bg-[#F7F7F9]"
                onChange={(e) => setUsername(e.target.value.trim())}
              />
            </div>
          )}

          <div className="mt-4 md:mt-8 flex flex-col w-full gap-1 m">
            <div className="w-full flex justify-between items-center">
              <div className="font-body font-medium text-title_3 text-black self-start">
                What I do?
              </div>

              <div className="font-body text-body_3 text-[#000000]/60">
                300chars max.
              </div>
            </div>

            <textarea
              name=""
              id=""
              rows={5}
              placeholder="Briefly introduce your business..."
              className="font-body text-body_2 text-[#000000] placeholder:font-body placeholder:text-body_2 placeholder:text-[#000000]/60 border border-[#B7B9BC] rounded-lg py-4 px-3 bg-[#F7F7F9]"
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              maxLength={300}
            />
          </div>

          <div className="mt-6 md:mt-8 flex flex-col md:flex-row w-full gap-6 md:gap-5">
            <div className="w-full flex flex-col gap-1">
              <div className="font-body font-medium text-title_3 text-black self-start">
                Your Location
              </div>

              <LocationSelector
                cityName={cityName}
                setCityName={setCityName}
                setState={setState}
                setCity={setCity}
                stateCities={stateCities}
                className="md:hidden"
              />

              <div className="hidden md:flex md:flex-col gap-4">
                <LocationSelect
                  locationType="STATE"
                  states={states}
                  setLocation={setState}
                />

                <LocationSelect
                  locationType="CITY"
                  cities={state && stateCities ? stateCities[state] : null}
                  setLocation={setCity}
                />
              </div>
            </div>

            <div className="w-full">
              <div className="font-body font-medium text-title_3 text-black self-start">
                Business Address
              </div>

              <textarea
                name=""
                id=""
                rows={4}
                placeholder="Enter address..."
                className="w-full font-body text-body_2 text-[#000000] placeholder:font-body placeholder:text-body_2 placeholder:text-[#000000]/60 border border-[#B7B9BC] bg-[#F7F7F9] rounded-lg py-4 px-3"
                onChange={(e) => setBusinessAddr(e.target.value)}
                value={businessAddr}
              />
            </div>
          </div>

          <div className={cn("mt-8 md:mt-7 w-full", !isOnboarding && "mb-10")}>
            <div className="font-body text-title_3 font-medium text-black">
              Social Media Links
            </div>

            <div className="mt-2 w-full flex flex-col gap-3">
              <div className="px-3 py-[10px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                <div className="relative w-full">
                  <Image
                    src={"/images/icons/facebookProfileIcon.png"}
                    height={24}
                    width={24}
                    alt="facebook"
                    className="absolute left-0"
                  />
                  <input
                    type="text"
                    className="font-body text-body_3 w-11/12 bg-background placeholder:text-secondary placeholder:text-body_3 ml-8 pl-1 py-1"
                    placeholder=" Copy your Facebook link and Paste here!"
                    onChange={(e) => setFacebookLink(e.target.value)}
                    value={facebookLink}
                  />
                </div>

                <Image
                  src="/images/icons/content_paste.png"
                  height={20}
                  width={20}
                  alt="copy content"
                  className="hover:cursor-pointer"
                />
              </div>

              <div className="px-3 py-[10px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                <div className="w-full relative">
                  <Image
                    src={"/images/icons/instagramProfileIcon.png"}
                    height={24}
                    width={24}
                    alt="instagram"
                    className="absolute left-0"
                  />
                  <input
                    type="text"
                    className="font-body text-body_3 w-11/12 bg-background placeholder:text-secondary placeholder:text-body_3 ml-8 pl-1 py-1"
                    placeholder="Copy your Instagram link and paste here!"
                    onChange={(e) => setInstagramLink(e.target.value)}
                    value={instagramLink}
                  />
                </div>

                <Image
                  src="/images/icons/content_paste.png"
                  height={20}
                  width={20}
                  alt="copy content"
                  className="hover:cursor-pointer"
                />
              </div>

              <div className="px-3 py-[10px] bg-background flex w-full border border-[#D9D9D9] rounded-lg">
                <div className="relative w-full">
                  <Image
                    src={"/images/icons/whatsappProfileIcon.png"}
                    height={24}
                    width={24}
                    alt="whatsapp"
                    className="absolute left-0"
                  />
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary placeholder:text-body_3 ml-8 pl-1 py-1"
                    placeholder="Type in your WhatsApp ID (WhatsApp number)"
                    onChange={(e) => setWhatsappNum(e.target.value)}
                    value={whatsppNum}
                  />
                </div>
              </div>
            </div>
          </div>

          {isOnboarding ? (
            <>
              {isLoading ? (
                <Button className="mt-8 w-full max-w-[225px] rounded-[14px] py-2">
                  Saving
                </Button>
              ) : (
                <Button
                  className="mt-8 w-full max-w-[225px] rounded-[14px] py-2"
                  onClick={onSaveClick}
                >
                  Save and continue
                </Button>
              )}

              <div className="font-body text-secondary text-body_1 mt-10 md:mt-6">
                © 2023 Askit. All Rights Reserved.
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
});

ProfileInfo.displayName = "ProfileInfo";
export default ProfileInfo;

interface LocationSelectorI {
  cityName: string | null;
  setCityName: React.Dispatch<React.SetStateAction<string | null>>;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  setCity: React.Dispatch<React.SetStateAction<number | null>>;
  stateCities: { [id: string]: CityInterface[] } | null;
}

const LocationSelector = React.forwardRef<
  React.ElementRef<typeof Menubar>,
  React.ComponentPropsWithoutRef<typeof Menubar> & LocationSelectorI
>(
  (
    {
      className,
      children,
      stateCities,
      cityName,
      setCityName,
      setState,
      setCity,
      ...props
    },
    fowardref
  ) => {
    const states = stateCities ? Object.keys(stateCities) : null;

    return (
      <Menubar className={className} ref={fowardref} {...props}>
        <MenubarMenu>
          <MenubarTrigger className="flex items-center justify-between w-full px-4 py-3 border border-grey rounded">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src={"https://flagsapi.com/NG/flat/64.png"}
                  width={24}
                  height={18}
                  alt="Nigerian flag"
                />

                <React.Suspense
                  fallback={
                    <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
                  }
                >
                  <KeyboardArrowDownIcon className="text-[#828080]" />
                </React.Suspense>
              </div>

              <span className="font-body text-body_1 text-black/60">
                {cityName || "Select"}
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
            {states &&
              states.map((state, index) => {
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
                      {stateCities &&
                        stateCities[state].map((city) => {
                          return (
                            <MenubarItem
                              key={city.id}
                              className="px-1 font-body text-special hover:cursor-default hover:bg-stroke/60 relative select-none outline-none data-[state=open]:bg-stroke/60 data-[highlighted]:bg-gradient-to-br data-[disabled]:pointer-events-none"
                              onClick={() => {
                                setState(state);
                                setCity(city.id);
                                setCityName(city.city);
                              }}
                            >
                              {city.city}
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

type LocationSelectI =
  | {
      locationType: "STATE";
      states: string[] | null;
      setLocation: React.Dispatch<React.SetStateAction<string | null>>;
    }
  | {
      locationType: "CITY";
      cities: CityInterface[] | null;
      setLocation: React.Dispatch<React.SetStateAction<number | null>>;
    };

const LocationSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select> & LocationSelectI
>(({ children, ...props }, fowardref) => {
  return (
    <Select
      onValueChange={(e) => {
        if (props.locationType === "STATE") {
          props.setLocation(e);
        }
        if (props.locationType === "CITY") {
          props.setLocation(Number(e));
        }
      }}
      {...props}
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
          <div className="flex items-center gap-1">
            <Image
              src={"https://flagsapi.com/NG/flat/64.png"}
              width={24}
              height={18}
              alt="Nigerian flag"
            />

            <React.Suspense
              fallback={
                <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
              }
            >
              <KeyboardArrowDownIcon className="text-[#828080]" />
            </React.Suspense>
          </div>

          <SelectValue
            placeholder="Select type"
            className="placeholder:font-body placeholder:text-body placeholder:text-body_1 placeholder:text-black/60 font-body"
          />
        </div>
      </SelectTrigger>

      <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
        <SelectGroup>
          <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3 pl-2">
            {props.locationType === "STATE" && "Select a State"}
            {props.locationType === "CITY" && "Select a City"}
          </SelectLabel>
          {props.locationType === "STATE" &&
            props.states &&
            props.states.map((state, index) => {
              return (
                <SelectItem
                  value={state}
                  key={index}
                  className="hover:cursor-pointer font-body text-title_2 pl-2"
                >
                  {state}
                </SelectItem>
              );
            })}
          {props.locationType === "CITY" &&
            props.cities &&
            props.cities.map((city, index) => {
              return (
                <SelectItem
                  value={city.id.toString()}
                  key={city.id}
                  className="hover:cursor-pointer font-body text-title_2 pl-2"
                >
                  {city.city}
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

LocationSelect.displayName = "LocationSelect";
