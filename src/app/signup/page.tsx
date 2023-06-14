import LoginCard from "@/components/LoginCard";
import Image from "next/image";
import React from "react";

type Props = {};

export default function SignupPage({}: Props) {
  return (
    <main className=" bg-white w-[100vw] h-[100vh] relative z-10 flex justify-end">
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
        className="absolute w-[900px] h-[550px] top-1/2 -translate-y-[55%] left-1/2 -translate-x-1/2"
      />

      <Image
        src="/images/pictures/loginBackground3.png"
        width={256}
        height={256}
        alt="background image 3"
        className="absolute top-[15%] -translate-y-[50%] right-0 h-[200px] w-[200px]"
      />

      <LoginCard className="md:mr-[140px]" />
    </main>
  );
}
