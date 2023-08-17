"use client";

import { cn } from "@/app/lib/utils";
import { UserType } from "@/app/types";
import Image from "next/image";
import React from "react";
import Dialog from "./ui/DialogPrimitive";
import ExternalAppConfirmation from "./ExternalAppConfirmation";
import Button from "./ui/Button";
import { DialogClose } from "@radix-ui/react-dialog";

const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const CallIcon = React.lazy(() => import("@mui/icons-material/Call"));
const ContactMailIcon = React.lazy(
  () => import("@mui/icons-material/ContactMail")
);

const UserInfo = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    userDetails: UserType | null;
    variant?: "profile";
  }
>(({ className, variant, userDetails, ...props }, forwardRef) => {
  console.log("image_url: ", userDetails?.image_url);

  return (
    <div
      ref={forwardRef}
      className={cn(
        "w-full bg-primary py-4 px-5 rounded-[20px] flex flex-col items-center shadow-boxShadow_3 border-[1px] border-black md:max-w-[348px] h-fit",
        className
      )}
      {...props}
    >
      {/* {userDetails?.image_url ? (
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
      )} */}

      <React.Suspense>
        <PersonIcon
          className="text-stroke scale-[200%] bg-[#D9D9D9] p-[2px] rounded-[50%] mt-4"
          fontSize="large"
        />
      </React.Suspense>

      <div className="flex flex-col gap-1 justify-center mt-6 items-center">
        <div className="font-headline text-headline_2 font-bold text-white mt-4">
          {userDetails?.name}
        </div>

        {userDetails?.whatsapp_num && (
          <div className="flex gap-2 text-white font-body text-title_3 font-medium mt-1">
            <React.Suspense>
              <CallIcon className="" fontSize="small" />
            </React.Suspense>

            <div className="font-body text-title_3 font-medium">
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
        <div className="mt-10 flex flex-col gap-2 text-white">
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
          <a
            href={`mailto:${userDetails?.email}`}
            className="relative w-full bg-white rounded p-3 h-10 flex items-center"
          >
            <React.Suspense>
              <ContactMailIcon className="absolute top-1/2 -translate-y-1/2 left-3 text-black" />
            </React.Suspense>
            <div className=" absolute top-1/2 -translate-y-[45%] left-1/2 -translate-x-1/2 w-full text-center font-headline font-bold text-headline_3">
              Send me an email
            </div>
          </a>
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
                  <ExternalAppConfirmation
                    appTitle="Facebook"
                    closeDialogElement={
                      <div className="flex flex-col gap-6 items-center">
                        <DialogClose asChild>
                          <a href={userDetails.facebook_link}>
                            <Button className="px-11 py-3 rounded-lg hover:cursor-pointer">
                              Proceed to Facebook
                            </Button>
                          </a>
                        </DialogClose>

                        <DialogClose asChild>
                          <Button
                            variant={"outlined2"}
                            className="px-[72px] py-3 text-black border-black hover:cursor-pointer"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                      </div>
                    }
                  />
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
                  <ExternalAppConfirmation
                    appTitle="Instagram"
                    closeDialogElement={
                      <div className="flex flex-col gap-6 items-center">
                        <DialogClose asChild>
                          <a href={`${userDetails.instagram_link}`}>
                            <Button className="px-11 py-3 rounded-lg hover:cursor-pointer">
                              Proceed to Instagram
                            </Button>
                          </a>
                        </DialogClose>

                        <DialogClose asChild>
                          <Button
                            variant={"outlined2"}
                            className="px-[72px] py-3 text-black border-black hover:cursor-pointer"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                      </div>
                    }
                  />
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
                  <ExternalAppConfirmation
                    appTitle="WhatsApp"
                    closeDialogElement={
                      <div className="flex flex-col gap-6 items-center">
                        <DialogClose asChild>
                          <a href={"https://wa.me/" + userDetails.whatsapp_num}>
                            <Button className="px-11 py-3 rounded-lg hover:cursor-pointer">
                              Proceed to WhatsApp
                            </Button>
                          </a>
                        </DialogClose>

                        <DialogClose asChild>
                          <Button
                            variant={"outlined2"}
                            className="px-[72px] py-3 text-black border-black hover:cursor-pointer"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                      </div>
                    }
                  />
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
