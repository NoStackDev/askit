"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { UserType } from "@/app/types";

import { cn } from "@/app/lib/utils";
import { useAuthContext } from "@/app/context/authContext";
import { loginUser, updateUser } from "@/app/lib/user";
import { useGlobalContext } from "@/app/context/Store";
import getUser from "@/app/lib/user/getUser";
import LocationSelector from "./LocationSelector";
import useLocations from "@/hooks/useLocation";
import Dialog from "./ui/DialogPrimitive";
import usePreferences from "@/hooks/usePreferences";

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
  const [about, setAbout] = React.useState<string>(
    userDetails?.about ? userDetails?.about : ""
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

  const { setToken, user: authUser, setUser: setAuthUser } = useGlobalContext();
  const { isLoading, isOnboarding, dispatch } = useAuthContext();
  const [isSaving, setIsSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    [errorName: string]: string[];
  } | null>(null);

  const [locations, flattenedLocations] = useLocations();
  const [selectedLocation, setSelectedLocation] = React.useState<number | null>(
    null
  );

  const [openLocationModal, setOpenLocationModal] = React.useState(false);
  usePreferences();

  const profilePicRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    isOnboarding &&
      (async () => {
        try {
          if (authUser?.authEmail && authUser.authPassword) {
            const tokenRes = await loginUser({
              email: authUser?.authEmail,
              password: authUser?.authPassword,
            });

            setToken(tokenRes.token);
            window.localStorage.setItem("token", tokenRes.token);
            const userDetails = await getUser(tokenRes.token);

            if (userDetails) {
              window.localStorage.setItem(
                "userDetails",
                JSON.stringify(userDetails)
              );
            }
          }
        } catch (err) {
          console.log(err);
        }
      })();
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
    setErrors(null);
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
      return;
    }

    try {
      setIsSaving(true);
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const data = new FormData();
      data.append("name", username);
      data.append("about", about);
      data.append("business_addr", businessAddr);

      if (facebookLink.trim().length > 1) {
        data.append("facebook_link", facebookLink);
      }
      if (whatsppNum.trim().length > 1) {
        data.append("whatsapp_num", whatsppNum);
      }
      if (instagramLink.trim().length > 1) {
        data.append("instagram_link", instagramLink);
      }
      if (selectedLocation) {
        data.append("location_id", selectedLocation.toString());
      }

      if (imageFile) {
        data.append("profile_img", imageFile[0], imageFile[0].name);
      }

      const updatedUser = await updateUser(headers, data);

      if (updatedUser.data) {
        const { responses, ...otherData } = updatedUser.data;
        console.log("response: ", otherData);
        window.localStorage.setItem(
          "userDetails",
          JSON.stringify({ data: otherData })
        );
        setIsSaving(false);
      }
      if (updatedUser.isError) {
        setErrors({ ...updatedUser.errors });
        setIsSaving(false);
      }
    } catch (err) {
      console.log(err);
      setIsSaving(false);
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
          if (selectedLocation) {
            data.append("location_id", selectedLocation.toString());
          }

          if (imageFile) {
            data.append("profile_img", imageFile[0], imageFile[0].name);
          }

          const updatedUser = await updateUser(headers, data);

          if (updatedUser.isError) {
            window.localStorage.removeItem("userDetails");
            window.location.href = "/login";
            return;
          }

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
              Sav{isSaving ? "ing" : "e"} Changes
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
              {userDetails ? (
                <input
                  type="text"
                  value={username}
                  className="w-full font-body text-body_1 text-[#000000] py-2 px-3 border border-grey rounded-xl bg-[#F7F7F9]"
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                />
              ) : (
                <input
                  type="text"
                  value={username}
                  className="w-full font-body text-body_1 text-[#000000] py-2 px-3 border border-grey rounded-xl bg-[#F7F7F9]"
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
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
              <div className="w-full">
                {errors && errors.facebook_link && (
                  <div className="font-body text-[red]/60 text-special">
                    {errors.facebook_link}
                  </div>
                )}
                <div className="px-3 py-[10px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                  <div className="relative w-full flex gap-2 items-center">
                    <Image
                      src={"/images/icons/facebookProfileIcon.png"}
                      height={24}
                      width={24}
                      alt="facebook"
                      className=""
                    />
                    <input
                      type="text"
                      className="font-body text-body_3 w-[calc(100%-40px)] bg-background placeholder:text-secondary placeholder:text-body_3 pl-1 py-1"
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
              </div>

              <div className="w-full">
                {errors && errors.instagram_link && (
                  <div className="font-body text-[red]/60 text-special">
                    {errors.instagram_link}
                  </div>
                )}
                <div className="px-3 py-[10px] bg-background flex w-full justify-between border border-[#D9D9D9] rounded-lg">
                  <div className="w-full relative flex gap-2 items-center">
                    <Image
                      src={"/images/icons/instagramProfileIcon.png"}
                      height={24}
                      width={24}
                      alt="instagram"
                      className=""
                    />
                    <input
                      type="text"
                      className="font-body text-body_3 w-[calc(100%-40px)] bg-background placeholder:text-secondary placeholder:text-body_3 pl-1 py-1"
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
              </div>

              <div className="w-full">
                {errors && errors.whatsapp_num && (
                  <div className="font-body text-[red]/60 text-special">
                    {errors.whatsapp_num}
                  </div>
                )}
                <div className="px-3 py-[10px] bg-background flex w-full border border-[#D9D9D9] rounded-lg">
                  <div className="relative w-full flex items-center gap-2">
                    <Image
                      src={"/images/icons/whatsappProfileIcon.png"}
                      height={24}
                      width={24}
                      alt="whatsapp"
                      className=""
                    />
                    <input
                      type="text"
                      className="font-body text-body_3 w-full bg-background placeholder:text-secondary placeholder:text-body_3 pl-1 py-1"
                      placeholder="Type in your WhatsApp ID (WhatsApp number)"
                      onChange={(e) => setWhatsappNum(e.target.value)}
                      value={whatsppNum}
                    />
                  </div>
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
