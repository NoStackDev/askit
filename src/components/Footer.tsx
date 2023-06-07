'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

const LinkedInIcon = React.lazy(() => import("@mui/icons-material/LinkedIn"));
const FacebookIcon = React.lazy(() => import("@mui/icons-material/Facebook"));
const TwitterIcon = React.lazy(() => import("@mui/icons-material/Twitter"));

interface Props extends HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<React.ElementRef<"footer">, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "bg-black rounded-tl-[20px] rounded-tr-[20px] md:mx-[100px] px-[66px] py-6 md:scroll-py-10 flex flex-col items-center text-white",
          className
        )}
        {...props}
      >
        <div className="flex flex-col md:flex-row md:justify-between w-full items-center">
          <Link href="/" className="max-w-fit flex gap-2 items-center">
            <div className="w-6 h-6 bg-primary"></div>
            <span className="font-headline text-headline_2 font-bold">
              AskIt
            </span>
          </Link>

          <div className="flex flex-col md:flex-row gap-4 md:gap-14 mt-7 md:mt-0 items-center">
            <Link
              href="/"
              className="text-white font-body font-medium text-base underline underline-offset-2 h-fit w-fit"
            >
              About us
            </Link>

            <Link
              href="/"
              className="text-white font-body font-medium text-base underline underline-offset-2 h-fit w-fit"
            >
              Enterprise
            </Link>

            <Link
              href="/"
              className="text-white font-body font-medium text-base underline underline-offset-2 h-fit w-fit"
            >
              Agent
            </Link>

            <Link
              href="/"
              className="text-white font-body font-medium text-base underline underline-offset-2 h-fit w-fit"
            >
              Promotion
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

        <div className="mt-8 flex flex-col items-center md:w-full gap-4 border-b-[1px] border-white border-opacity-30 pb-5">
          <div className="text-headline_3 font-headline font-bold bg-[#48466D] md:self-start">
            Contact us
          </div>

          <div className="flex flex-col md:flex-row md:w-full gap-4 md:gap-14 items-center md:items-start">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-title_3 font-body font-medium opacity-60">
                Address
              </span>
              <span className="w-[266px] text-body_1 font-body text-center md:text-justify">
                No.5 Vincent Opara street, off G-estate, Asaba, Delta State,
                Nigeria
              </span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-title_3 font-body font-medium opacity-60">
                Email
              </span>
              <span className="w-[266px] text-body_1 font-body text-center md:text-justify">
                Admin.askit@gmail.com
              </span>
            </div>

            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-title_3 font-body font-medium opacity-60">
                Phone
              </span>
              <span className="w-[266px] text-body_1 font-body text-center md:text-justify">
                +234 803 4565 915
              </span>
              <span className="w-[266px] text-body_1 font-body text-center md:text-justify">
                +234 803 4565 915
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-6 md:mb-14 flex flex-col md:flex-row items-center md:items-start w-[261px] md:w-full gap-2 md:gap-10">
          <span className="text-body_1 font-body">
            © 2023 Askit. All Rights Reserved.
          </span>
          <span className="font-body text-sm underline underline-offset-2 hover:cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
