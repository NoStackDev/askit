
import Button from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Custom404({}: Props) {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="flex  gap-8 justify-center items-center">
        <div className="font-headline text-[44px] text-secondary font-bold">
          404
        </div>

        <div className="w-[6px] h-[61px] bg-[#000000]"></div>

        <div className="font-headline text-headline_2 font-bold text-black">
          Oops!... Page Not Found
        </div>
      </div>

      <Link href="/" className="h-fit w-fit mt-16">
        <Button className="font-body text-title_3 font-medium px-8 py-2 text-white">
          Go to Homepage
        </Button>
      </Link>
    </main>
  );
}
