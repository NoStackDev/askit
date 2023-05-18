import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<React.ElementRef<"footer">, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "bg-black rounded-tl-[20px] rounded-tr-[20px] md:mx-[100px] px-[66px] py-6 md:scroll-py-10 flex flex-col items-center",
          className
        )}
        {...props}
      >
        <div className="flex flex-col md:flex-row md:justify-between w-full items-center">
          <Link href="/" className="max-w-fit flex gap-2 items-center">
            <div className="w-6 h-6 bg-primary"></div>
            <span className="font-headline text-headline_2 font-bold text-white">
              AskIt
            </span>
          </Link>

          <div className="flex flex-col md:flex-row gap-4 md:gap-14 mt-7 items-center">
            <Link href="/" className="text-white font-body font-medium text-base underline underline-offset-2">
              About us
            </Link>

            <Link href="/" className="text-white font-body font-medium text-base underline underline-offset-2">
              Enterprise
            </Link>

            <Link href="/" className="text-white font-body font-medium text-base underline underline-offset-2">
              Agent
            </Link>

            <Link href="/" className="text-white font-body font-medium text-base underline underline-offset-2">
              Promotion
            </Link>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
