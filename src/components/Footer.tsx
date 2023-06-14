"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";

const LinkedInIcon = React.lazy(() => import("@mui/icons-material/LinkedIn"));
const FacebookIcon = React.lazy(() => import("@mui/icons-material/Facebook"));
const TwitterIcon = React.lazy(() => import("@mui/icons-material/Twitter"));

interface Props extends HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<React.ElementRef<"footer">, Props>(
  ({ className, children, ...props }, ref) => {
    const path = usePathname();
    const renderFooter = path.split("/")[1] === "login";

    return (
      <>
        {!renderFooter ? (
          <footer
            ref={ref}
            className={cn(
              "bg-black rounded-tl-[20px] rounded-tr-[20px] md:mx-[100px] px-10 py-6 md:pt-10 flex flex-col items-center text-white",
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

              <div className="flex flex-col md:flex-row gap-4 md:gap-14 mt-7 md:mt-0 items-center">
                <Link
                  href="/"
                  className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit"
                >
                  About us
                </Link>

                <Link
                  href="/FAQ"
                  className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit"
                >
                  FAQ
                </Link>

                <Link
                  href="/request"
                  className="text-white font-body font-medium text-title_3 underline underline-offset-2 h-fit w-fit"
                >
                  Place a Request
                </Link>

                <Link
                  href="/safety"
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
              <span className="font-body text-special underline underline-offset-2 hover:cursor-pointer">
                Terms & Privacy Policy
              </span>
            </div>
          </footer>
        ) : null}
      </>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
