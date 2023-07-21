"use client";

import { useGlobalContext } from "@/app/context/Store";
import { cn } from "@/app/lib/utils";
import { UserType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dialog from "./ui/DialogPrimitive";

const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const CallIcon = React.lazy(() => import("@mui/icons-material/Call"));
const ContactMailIcon = React.lazy(
  () => import("@mui/icons-material/ContactMail")
);
const InstagramIcon = React.lazy(() => import("@mui/icons-material/Instagram"));
const FacebookIcon = React.lazy(() => import("@mui/icons-material/Facebook"));
const WhatsApp = React.lazy(() => import("@mui/icons-material/WhatsApp"));

const UserInfo = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    userDetails: UserType | null;
    variant?: "profile";
  }
>(({ className, variant, userDetails, ...props }, forwardRef) => {
  return (
    <div
      ref={forwardRef}
      className={cn(
        "w-full bg-primary py-4 px-5 rounded-[20px] flex flex-col items-center shadow-boxShadow_3 border-[1px] border-black md:max-w-[348px] h-fit",
        className
      )}
      {...props}
    >
      {userDetails?.image_url ? (
        <Image
          src={userDetails.image_url}
          height={80}
          width={80}
          alt={`${userDetails.name} profile pic`}
        />
      ) : (
        <React.Suspense>
          <PersonIcon
            className="text-stroke scale-[200%] bg-[#D9D9D9] p-[2px] rounded-[50%] mt-4"
            fontSize="large"
          />
        </React.Suspense>
      )}

      <div className="flex flex-col gap-1 justify-center mt-6 items-center">
        <div className="font-headline text-headline_2 font-bold text-white">
          {userDetails?.name}
        </div>

        {userDetails?.whatsapp_num && (
          <div className="flex gap-2 text-white font-body text-title_3 font-medium">
            <React.Suspense>
              <CallIcon className="" />
            </React.Suspense>

            <div className="font-body text-title_3 font-bold">
              {userDetails?.whatsapp_num}
            </div>
          </div>
        )}
      </div>

      {userDetails?.business_addr && (
        <div className="flex flex-col gap-1 mt-4 justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <div className="font-body text-special font-light text-white">
              Business Address
            </div>
            <div className="font-body text-title_3 font-medium text-white">
              {userDetails?.business_addr}
            </div>
          </div>
        </div>
      )}

      {userDetails?.about && (
        <div className="mt-6 flex flex-col gap-2 text-white">
          <div className="font-headline font-bold text-title_3 w-full text-center">
            WHAT I DO
          </div>
          <div className="font-body text-title_1 font-medium text-center">
            {userDetails?.about}
          </div>
        </div>
      )}

      <div className="w-full flex flex-col items-center justify-center gap-4 mt-14">
        {variant === "profile" ? null : (
          <Link
            href={`mailto:${userDetails?.email}`}
            className="relative w-full bg-white rounded p-3 h-10 flex items-center"
          >
            <React.Suspense>
              <ContactMailIcon className="absolute top-1/2 -translate-y-1/2 left-3 text-black" />
            </React.Suspense>
            <div className=" absolute top-1/2 -translate-y-[45%] left-1/2 -translate-x-1/2 w-full text-center font-headline font-bold text-headline_3">
              Send me an email
            </div>
          </Link>
        )}

        {(userDetails?.facebook_link ||
          userDetails?.whatsapp_num ||
          userDetails?.instagram_link) && (
          <>
            <div className="font-body text-title_3 font-medium text-center text-white">
              {variant === "profile"
                ? "My social media links"
                : "or check me on social media"}
            </div>
            <div className="flex gap-6">
              {userDetails?.facebook_link && (
                <Dialog
                  dialogTrigger={
                    <Image
                      src="/images/icons/facebookProfileIcon.png"
                      height={24}
                      width={24}
                      alt="facebook link"
                      className="hover:cursor-pointer"
                    />
                  }
                  className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40"
                >
                  <div className="bg-white px-3 py-4 font-body w-[200px] rounded-md">
                    <div>You are about to leave this site, continue?</div>
                    <div className="mt-2 flex justify-center gap-10">
                      <div
                        className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-primary/60 hover:cursor-pointer"
                        onClick={() => {
                          const dialogCloseTrigger =
                            document.getElementById("dialogCloseTrigger");
                          dialogCloseTrigger?.click();
                        }}
                      >
                        No
                      </div>
                      <Link href={userDetails.facebook_link}>
                        <div className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-secondary hover:cursor-pointer">
                          Yes
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dialog>
              )}

              {userDetails?.instagram_link && (
                <Dialog
                  dialogTrigger={
                    <Image
                      src="/images/icons/instagramProfileIcon.png"
                      height={24}
                      width={24}
                      alt="instagram link"
                      className="hover:cursor-pointer"
                    />
                  }
                  className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40"
                >
                  <div className="bg-white px-3 py-4 font-body w-[200px] rounded-md">
                    <div>You are about to leave this site, continue?</div>
                    <div className="mt-2 flex justify-center gap-10">
                      <div
                        className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-primary/60 hover:cursor-pointer"
                        onClick={() => {
                          const dialogCloseTrigger =
                            document.getElementById("dialogCloseTrigger");
                          dialogCloseTrigger?.click();
                        }}
                      >
                        No
                      </div>
                      <Link href={userDetails.instagram_link}>
                        <div className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-secondary hover:cursor-pointer">
                          Yes
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dialog>
              )}

              {userDetails?.whatsapp_num && (
                <Dialog
                  dialogTrigger={
                    <Image
                      src="/images/icons/whatsappProfileIcon.png"
                      height={24}
                      width={24}
                      alt="whatsapp link"
                      className="hover:cursor-pointer"
                    />
                  }
                  className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40"
                >
                  <div className="bg-white px-3 py-4 font-body w-[200px] rounded-md">
                    <div>You are about to leave this site, continue?</div>
                    <div className="mt-2 flex justify-center gap-10">
                      <div
                        className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-primary/60 hover:cursor-pointer"
                        onClick={() => {
                          const dialogCloseTrigger =
                            document.getElementById("dialogCloseTrigger");
                          dialogCloseTrigger?.click();
                        }}
                      >
                        No
                      </div>
                      <Link href={"https://wa.me/" + userDetails.whatsapp_num}>
                        <div className="w-12 h-8 flex justify-center items-center rounded-md text-white bg-secondary hover:cursor-pointer">
                          Yes
                        </div>
                      </Link>
                    </div>
                  </div>
                </Dialog>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

UserInfo.displayName = "UserInfo";

export default UserInfo;
