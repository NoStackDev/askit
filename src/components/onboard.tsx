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
import { City } from "@/app/types";
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

const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);

type Props = {};

const Onboard = (props: Props) => {
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<string | null>(null);
  const [about, setAbout] = React.useState<string>("");
  const [businessAddr, setBusinessAddr] = React.useState<string>("");
  const [facebookLink, setFacebookLink] = React.useState<string>("");
  const [instagramLink, setInstagramLink] = React.useState<string>("");
  const [whatsppNum, setWhatsappNum] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [imageBase64, setImageBase64] = React.useState<
    string | ArrayBuffer | null
  >(null);
  const [imageFile, setImageFile] = React.useState<FileList>();

  const { setToken, user: authUser, setUser: setAuthUser } = useGlobalContext();
  const { isLoading, dispatch } = useAuthContext();

  const profilePicRef = React.useRef<HTMLInputElement>(null);

  const states = Object.keys(statesConfig);

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

  const onSaveClick = async () => {
    try {
      const data = new FormData();
      data.append("about", about);
      data.append("business_addr", businessAddr);
      data.append("facebook_link", facebookLink);
      data.append("whatsapp_num", whatsppNum);
      data.append("instagram_link", instagramLink);
      if (imageFile) {
        data.append("profile_img", imageFile[0]);
      }

      if (authUser && authUser.authEmail && authUser.authPassword) {
        dispatch({ type: "UPDATING" });
        const loginData = await loginUser({
          email: authUser.authEmail,
          password: authUser.authPassword,
        });

        if (loginData.token) {
          setToken(loginData.token);
          window.localStorage.setItem("token", loginData.token);
          const updatedUser = await updateUser(data, loginData.token);

          if (updatedUser) {
            window.localStorage.set("userDetails", JSON.stringify(updatedUser));
            setAuthUser(null);
            dispatch({ type: "RESET" });
            window.location.replace("/");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="mt-4 md:mt-10 md:mx-[100px] bg-white md:bg-background flex justify-center items-center mb-10 md:mb-20">
      <div className="max-w-[700px] bg-white">
        <Topbar className="">Setup your profile</Topbar>

        <div className="flex flex-col justify-center items-center px-5 md:px-[92px]">
          <div className="mt-6 md:mt-6 text-primary font-body text-title_2 md:text-title_1 font-medium">
            Hi Username, Nice to have you onboard!
          </div>

          <div className="mt-4 font-body text-body_2 text-center">
            If you hope to be responding to people’s request, its needful you
            set up your profile to prove your credibility to potential client.
          </div>

          <div className="flex flex-col justify-center items-center mt-6 md:mt-10 gap-2">
            <div className="font-body font-medium text-title_3 text-[#000000]">
              Profile Picture
            </div>

            <div
              className={cn(
                "border rounded-full border-stroke p-5",
                imageBase64 && "p-0"
              )}
            >
              {imageBase64 ? (
                <Image
                  src={imageUrl}
                  height={82}
                  width={82}
                  alt="profile pic"
                  className="hover:cursor-pointer rounded-full"
                  onClick={onProfilePicClick}
                />
              ) : (
                <Image
                  src="/images/icons/person.png"
                  height={40}
                  width={40}
                  alt="profile pic"
                  className="hover:cursor-pointer rounded-full"
                  onClick={onProfilePicClick}
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

          <div className="mt-4 md:mt-8 flex flex-col w-full gap-1 m">
            <div className="font-body font-medium text-title_3 text-black self-start">
              What do you do?
            </div>

            <textarea
              name=""
              id=""
              rows={5}
              placeholder="Write here..."
              className="font-body text-body_1 placeholder:font-body placeholder:text-body_1 placeholder:opacity-60 border border-[#B7B9BC] rounded-lg py-4 px-3"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="mt-6 md:mt-8 flex flex-col md:flex-row w-full gap-6 md:gap-5">
            <div className="w-full flex flex-col gap-1">
              <div className="font-body font-medium text-title_3 text-black self-start">
                Your Location
              </div>

              <LocationSelector
                city={city}
                setState={setState}
                setCity={setCity}
                statesConfig={statesConfig}
                className="md:hidden"
              />

              <div className="hidden md:flex md:flex-col gap-4">
                <LocationSelect
                  locationType="STATE"
                  locations={states}
                  location={state}
                  setLocation={setState}
                />

                <LocationSelect
                  locationType="CITY"
                  locations={state ? statesConfig[state] : null}
                  location={city}
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
                className="w-full font-body text-body_1 placeholder:font-body placeholder:text-body_1 placeholder:opacity-60 border border-[#B7B9BC] rounded-lg py-4 px-3"
                onChange={(e) => setBusinessAddr(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 md:mt-7 w-full">
            <div className="font-body text-title_3 font-medium text-black">
              Social Media Links
            </div>

            <div className="mt-2 w-full flex flex-col gap-3">
              <div className="px-3 py-[6px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                <div className="w-full">
                  <div></div>
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary"
                    placeholder=" Copy your Facebook link and Paste here!"
                    onChange={(e) => setFacebookLink(e.target.value)}
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

              <div className="px-3 py-[6px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                <div className="w-full">
                  <div></div>
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary"
                    placeholder="Copy your Instagram link and paste here!"
                    onChange={(e) => setInstagramLink(e.target.value)}
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

              <div className="px-3 py-[6px] bg-background flex w-full border border-[#D9D9D9] rounded-lg">
                <div className="w-full">
                  <div></div>
                  <input
                    type="text"
                    className="font-body text-body_3 w-full bg-background placeholder:text-secondary"
                    placeholder="Type in your WhatsApp ID (WhatsApp number)"
                    onChange={(e) => setWhatsappNum(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </main>
  );
};

export default Onboard;

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
                    value={locationItem.geonameid.toString()}
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
