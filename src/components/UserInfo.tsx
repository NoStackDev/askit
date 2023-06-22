import { cn } from "@/app/lib/utils";
import React from "react";

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
    variant?: "profile";
  }
>(({ className, variant, ...props }, forwardRef) => {
  return (
    <div
      ref={forwardRef}
      className={cn(
        "w-full bg-primary py-4 px-5 rounded-[20px] flex flex-col items-center shadow-boxShadow_3 border-[1px] border-black md:max-w-[348px] h-fit",
        className
      )}
      {...props}
    >
      <React.Suspense>
        <PersonIcon
          className="text-stroke scale-[200%] bg-[#D9D9D9] p-[2px] rounded-[50%] mt-4"
          fontSize="large"
        />
      </React.Suspense>

      <div className="flex flex-col gap-1 justify-center mt-6 items-center">
        <div className="font-headline text-headline_2 font-bold text-white">
          User Name
        </div>

        <div className="flex gap-1 text-white font-body text-title_3 font-medium">
          <React.Suspense>
            <CallIcon className="" />
          </React.Suspense>

          <div className="font-body text-title_3 font-bold">08054423423</div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-4 justify-center items-center">
        <div className="font-body text-special font-light text-white">
          Business Address
        </div>

        <div className="flex gap-1 text-white font-body text-title_3 font-medium">
          <div className="text-center">
            No 3 off Maicon street, Asaba, Delta state
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 text-white">
        <div className="font-headline font-bold text-title_3 w-full text-center">WHAT I DO</div>
        <div className="font-body text-title_1 font-medium text-center">
          Lorem ipsum dolor sit amet consectetur. In malesuada fringilla
          molestie dis sapien posuere porttitor. Varius vitae mauris felis sem
          turpis turpis eu sed.
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-4 mt-14">
        {variant === "profile" ? null : (
          <button className="relative w-full bg-white rounded p-3 h-10 flex items-center">
            <React.Suspense>
              <ContactMailIcon className="absolute top-1/2 -translate-y-1/2 left-3 text-black" />
            </React.Suspense>
            <div className=" absolute top-1/2 -translate-y-[45%] left-1/2 -translate-x-1/2 w-full text-center font-headline font-bold text-headline_3">
              Send me an email
            </div>
          </button>
        )}

        <div className="font-body text-title_3 font-medium text-center text-white">
          {variant === "profile"
            ? "My social media links"
            : "or check me on social media"}
        </div>

        <div className="flex gap-6">
          <React.Suspense>
            <FacebookIcon />
          </React.Suspense>
          <React.Suspense>
            <InstagramIcon className="bg-black text-primary" />
          </React.Suspense>
          <React.Suspense>
            <WhatsApp className="bg-black text-primary" />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
});

UserInfo.displayName = "UserInfo";

export default UserInfo;
