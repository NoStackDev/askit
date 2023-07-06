"use client";

import LoginCard from "@/components/LoginCard";
import Image from "next/image";
import React from "react";
import { useAuthContext } from "../context/authContext";
import Onboard from "@/components/onboard";

type Props = {};

export default function SignupPage({}: Props) {
  const { isOnboarding } = useAuthContext();

  return (
    <>
      {isOnboarding ? (
        <Onboard />
      ) : (
        <main className="bg-white relative z-10 flex items-center justify-center md:px-[100px] h-main-height overflow-y-hidden">
          <Image
            src="/images/pictures/loginBackground1.png"
            width={214.63}
            height={220.98}
            alt="background image 1"
            className="hidden md:block absolute -top-16 left-5"
          />

          <Image
            src="/images/pictures/loginBackground2.png"
            width={1114.92}
            height={723.39}
            alt="background image 2"
            className="w-[88vw] scale-150 md:scale-100 h-auto"
          />

          <Image
            src="/images/pictures/loginBackground3.png"
            width={256}
            height={256}
            alt="background image 3"
            className="hidden md:block absolute top-[15%] -translate-y-[50%] right-0 h-[200px] w-[200px]"
          />

          <LoginCard className="absolute right-1/2 translate-x-1/2 md:right-[100px] md:translate-x-0 w-[348px] max-h-[600px] " />
        </main>
      )}
    </>
  );
}
