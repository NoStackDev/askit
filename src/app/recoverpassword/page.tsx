"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import recoverpassword from "../lib/user/recoverPassword";
import Link from "next/link";

const MailIcon = React.lazy(() => import("@mui/icons-material/Mail"));

type Props = {};

export default function RecoverPasswordPage({}: Props) {
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<{ [id: string]: string[] } | null>(
    null
  );
  const [isSending, setIsSending] = React.useState(false);
  const [mailSent, setMailSent] = React.useState(false);

  const onClickRecover = async () => {
    setErrors(null);
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setErrors({ email: ["invalid email"] });
      return;
    }

    try {
      setIsSending(true);
      const recoverRes = await recoverpassword(email);

      if (recoverRes.error) {
        setErrors({ generalError: ["Recovery process failed"] });
        setIsSending(false);
        return;
      }

      setMailSent(true);
      setIsSending(false);
    } catch (err) {
      console.log(err);
      setIsSending(false);
    }
  };

  return (
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

      <div className="absolute right-1/2 translate-x-1/2 md:right-[100px] md:translate-x-0 w-[358px] h-fit bg-[#F3F3F3] pt-10 pb-6 px-4 z-20 rounded-[20px] shadow-boxShadow_6 border-[4px] border-black flex flex-col items-center">
        {mailSent ? (
          <div className="font-headline text-headline_3 text-secondary font-bold text-center mt-9">
            Check your mail, <Link href={"/login"}>Login</Link>
          </div>
        ) : (
          <>
            <div className="font-headline text-headline_1 text-secondary font-bold text-center">
              Recover Password
            </div>

            <div className="font-headline text-headline_3 text-secondary font-bold text-center mt-9">
              Enter your registered email
            </div>

            <div className="w-full flex flex-col mt-28">
              {errors && errors.email?.length > 0 && (
                <div className="font-body text-body_3 text-[red]/60 self-start">
                  {errors.email[0]}
                </div>
              )}
              <div className="h-fit w-full flex rounded border-[2px] border-stroke">
                <React.Suspense>
                  <MailIcon
                    className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
                    fontSize="large"
                  />
                </React.Suspense>

                <input
                  type="text"
                  placeholder="Email"
                  className="pl-3 py-[6px] w-full font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full mt-12" onClick={onClickRecover}>
              Recover{isSending && "ing"}
            </Button>
          </>
        )}

        <div className="font-body text-label text-secondary text-center w-[284px] mt-6">
          © 2023 Askit. All Rights Reserved.
        </div>
      </div>
    </main>
  );
}
