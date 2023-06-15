import LoginCard from "@/components/LoginCard";
import Image from "next/image";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <main className="bg-white  relative z-10 flex items-center justify-center md:px-[100px] overflow-hidden">
      <Image
        src="/images/pictures/loginBackground1.png"
        width={214.63}
        height={220.98}
        alt="background image 1"
        className="absolute -top-16 left-5"
      />

      <Image
        src="/images/pictures/loginBackground2.png"
        width={1114.92}
        height={723.39}
        alt="background image 2"
        className="w-5/6 h-auto translate-y-[30px]"
      />

      <Image
        src="/images/pictures/loginBackground3.png"
        width={256}
        height={256}
        alt="background image 3"
        className="absolute top-[15%] -translate-y-[50%] right-0 h-[200px] w-[200px]"
      />

      <LoginCard className="absolute right-[100px] top-14" />
    </main>
  );
}
