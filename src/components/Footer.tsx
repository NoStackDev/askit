"use client";

import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";
import Dialog from "./ui/DialogPrimitive";
import RequestForm from "./RequestForm/RequestForm";

const LinkedInIcon = React.lazy(() => import("@mui/icons-material/LinkedIn"));
const FacebookIcon = React.lazy(() => import("@mui/icons-material/Facebook"));
const TwitterIcon = React.lazy(() => import("@mui/icons-material/Twitter"));

const renderInPage = ["login", "signup"];

interface Props extends HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<React.ElementRef<"footer">, Props>(
  ({ className, children, ...props }, ref) => {
    const path = usePathname();
    const pathUrl = path.split("/")[1];
    let renderFooter: string | undefined | boolean = renderInPage.find(
      (urlSplit) => urlSplit === pathUrl
    );
    renderFooter = Boolean(renderFooter);

    return (
      <>
        {!renderFooter ? (
          <footer
            ref={ref}
            className={cn(
              "bg-black rounded-tl-[20px] rounded-tr-[20px] md:mx-[100px] px-8 py-6 md:pt-10 flex flex-col items-center text-white",
              className
            )}
            {...props}
          >
            <div className="flex flex-col md:flex-row md:justify-between w-full items-center">
              <Link href="/" className="max-w-fit flex gap-2 items-center">
                <Image
                  src="/images/pictures/logo.png"
                  width={115}
                  height={32}
                  alt="logo"
                  className=""
                />
              </Link>

              <div className="flex justify-between gap-[11px] md:gap-14 mt-7 md:mt-0 items-center">
                <Link
                  href="/aboutUs"
                  className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit"
                >
                  About us
                </Link>

                <Link
                  href="/faqs"
                  className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit"
                >
                  FAQ
                </Link>

                <Dialog
                  dialogTrigger={
                    <div className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit hover:cursor-pointer">
                      Place a Request
                    </div>
                  }
                  className="-translate-x-1/2 z-30 fixed top-[80px] left-1/2"
                >
                  <RequestForm className="" />
                </Dialog>

                <Link
                  href="/safetyhints"
                  className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit"
                >
                  Safety Hints
                </Link>
              </div>

              <div className="flex gap-5 items-center mt-6 md:mt-0">
                <Link href="/">
                  <React.Suspense
                    fallback={
                      <div className="h-[30px] w-[30px] bg-stroke/80 animate-pulse"></div>
                    }
                  >
                    <LinkedInIcon />
                  </React.Suspense>
                </Link>

                <Link href="/">
                  <React.Suspense
                    fallback={
                      <div className="h-[30px] w-[30px] bg-stroke/80 animate-pulse"></div>
                    }
                  >
                    <FacebookIcon />
                  </React.Suspense>
                </Link>

                <Link href="/">
                  <React.Suspense
                    fallback={
                      <div className="h-[30px] w-[30px] bg-stroke/80 animate-pulse"></div>
                    }
                  >
                    <TwitterIcon />
                  </React.Suspense>
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center md:w-full pb-4 gap-4 border-b-[1px] border-white border-opacity-30">
              <div className="text-[16px] font-headline font-bold bg-[#48466D] md:self-start">
                Contact us
              </div>

              <div className="flex flex-col md:flex-row md:w-full gap-4 md:gap-0 md:justify-between items-center md:items-start">
                <div className="flex flex-col items-center md:items-start gap-1">
                  <span className="text-title_3 font-body font-medium opacity-60">
                    Address
                  </span>
                  <span className="text-body_3 font-body text-center md:text-justify">
                    No.5 Vincent Opara street, off G-estate, Asaba, Delta State,
                    Nigeria
                  </span>
                </div>

                <div className="flex flex-col items-center md:items-start gap-1">
                  <span className="text-title_3 font-body font-medium opacity-60">
                    Email
                  </span>
                  <span className="text-body_3 font-body text-center md:text-justify">
                    Admin.askit@gmail.com
                  </span>
                </div>

                <div className="flex flex-col items-center md:items-start gap-1">
                  <span className="text-title_3 font-body font-medium opacity-60">
                    Phone
                  </span>
                  <div className="flex flex-col md:flex-row gap-4">
                    <span className="text-body_3 font-body text-center md:text-justify">
                      +234 803 4565 915
                    </span>
                    <span className="text-body_3 font-body text-center md:text-justify">
                      +234 803 4565 915
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row items-center md:items-start w-[261px] md:w-full gap-2 md:gap-10">
              <span className="text-body_3 font-body">
                © 2023 Askit. All Rights Reserved.
              </span>
              <Link href="/terms&privacy">
                <span className="font-body text-special underline underline-offset-2 hover:cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </Link>
            </div>
          </footer>
        ) : null}
      </>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
