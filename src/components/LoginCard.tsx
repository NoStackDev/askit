"use client";

import React, { FormEvent, MouseEvent } from "react";

import * as FormPrimitive from "@radix-ui/react-form";
import Button from "./ui/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { loginUser, registerUser } from "@/app/lib/user";
import { cn } from "@/app/lib/utils";
import getUser from "@/app/lib/user/getUser";
import { useGlobalContext } from "@/app/context/Store";

const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const MailIcon = React.lazy(() => import("@mui/icons-material/Mail"));
const LockIcon = React.lazy(() => import("@mui/icons-material/Lock"));

const LoginCard = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setToken, setUser } = useGlobalContext();

  const onSignUpClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = registerUser(name, email, password);
    const user = await userData;
  };

  const onLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginRes = loginUser({ email, password });
      const loginData = await loginRes;

      if (loginData.token) {
        setToken(loginData.token);
        const userData = await getUser(loginData.token);
        setUser(userData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const path = usePathname();
  const pathUrl = path.split("/")[1];
  let renderLogin = Boolean(pathUrl === "login");

  return (
    <div
      ref={ref}
      className={cn(
        "bg-[#F3F3F3] pt-4 pb-6 px-4 z-20 h-fit rounded-[20px] shadow-boxShadow_6 border-[4px] border-black w-[342px] flex flex-col items-center",
        className
      )}
      {...props}
    >
      <div className="font-headline text-headline_1 font-bold text-secondary text-center">
        {renderLogin ? "Login" : "Sign Up"}
      </div>

      {renderLogin ? (
        <div className="font-headline text-headline_3 font-bold text-primary mt-6">
          Great to have you back!
        </div>
      ) : null}

      {renderLogin ? (
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmitLogin={onLoginClick}
          className="mt-8"
        />
      ) : (
        <SignUpForm
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmitSignup={onSignUpClick}
          className="mt-8"
        />
      )}

      <div className="mt-8">
        {renderLogin ? (
          <>
            <span className="font-body text-body_2">
              Don’t have an account?
            </span>{" "}
            <span className="font-body text-title_2 font-medium text-[#1F4AE6]">
              <Link href="/signup" className="w-fit h-fit">
                Signup
              </Link>
            </span>
          </>
        ) : (
          <>
            <span className="font-body text-body_2">
              Already have an account?
            </span>{" "}
            <span className="font-body text-title_2 font-medium text-[#1F4AE6]">
              <Link href="/login">Login</Link>
            </span>
          </>
        )}
      </div>

      {renderLogin ? (
        <div className="font-body text-label text-secondary text-center w-[284px] mt-6">
          © 2023 Askit. All Rights Reserved.
        </div>
      ) : (
        <div className="font-body text-label text-black text-center w-[284px] mt-6">
          By signing up you agree to our terms of usage
        </div>
      )}
    </div>
  );
});

LoginCard.displayName = "LoginCard";

export default LoginCard;

function SignUpForm({
  className,
  setName,
  setEmail,
  setPassword,
  onSubmitSignup,
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmitSignup: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <FormPrimitive.Root
      className={cn("flex flex-col gap-6 w-full", className)}
      onSubmit={(e) => onSubmitSignup(e)}
    >
      <FormPrimitive.Field name="name">
        <div className="flex items-baseline justify-end h-3">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            name required
          </FormPrimitive.Message>
        </div>

        <div className="h-fit w-full flex rounded border-[2px] border-stroke">
          <React.Suspense>
            <PersonIcon
              className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
              fontSize="large"
            />
          </React.Suspense>

          <FormPrimitive.Control asChild className="w-full">
            <input
              type="text"
              placeholder="Your Names"
              className="pl-3 py-[6px] w-full font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="email">
        <div className="flex items-baseline justify-end h-3 mb-1">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            email required
          </FormPrimitive.Message>
        </div>

        <div className="h-fit w-full flex rounded border-[2px] border-stroke">
          <React.Suspense>
            <MailIcon
              className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
              fontSize="large"
            />
          </React.Suspense>

          <FormPrimitive.Control asChild className="w-full">
            <input
              type="text"
              placeholder="Email"
              className="pl-3 py-[6px] w-full font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="Password">
        <div className="flex items-baseline justify-end h-3 mb-1">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            password required
          </FormPrimitive.Message>
        </div>

        <div className="h-fit w-full flex rounded border-[2px] border-stroke">
          <React.Suspense>
            <LockIcon
              className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
              fontSize="large"
            />
          </React.Suspense>

          <FormPrimitive.Control asChild className="w-full">
            <input
              type="text"
              placeholder="Create Password"
              className="pl-3 w-full py-[6px] font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <div className="w-full h-fit flex items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          <Button className="w-full mt-8">Sign Up</Button>
        </FormPrimitive.Submit>
      </div>
    </FormPrimitive.Root>
  );
}

function LoginForm({
  className,
  setEmail,
  setPassword,
  onSubmitLogin,
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmitLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <FormPrimitive.Root
      className={cn("flex flex-col gap-6 w-full", className)}
      onSubmit={(e) => onSubmitLogin(e)}
    >
      <FormPrimitive.Field name="email">
        <div className="flex items-baseline justify-end h-3 mb-1">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            email required
          </FormPrimitive.Message>
        </div>

        <div className="h-fit w-full rounded border-[2px] border-stroke flex">
          <React.Suspense>
            <MailIcon
              className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
              fontSize="large"
            />
          </React.Suspense>

          <FormPrimitive.Control asChild className="w-full">
            <input
              type="text"
              placeholder="Email"
              className="pl-3 py-[6px] w-full font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="Password">
        <div className="flex items-baseline justify-end h-3 mb-1">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            password required
          </FormPrimitive.Message>
        </div>

        <div className="h-fit w-full flex rounded border-[2px] border-stroke">
          <React.Suspense>
            <LockIcon
              className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
              fontSize="large"
            />
          </React.Suspense>

          <FormPrimitive.Control asChild className="w-full">
            <input
              type="text"
              placeholder="Password"
              className="pl-3 py-[6px] font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60 w-full"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <div className="w-full h-fit flex items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          <Button className="w-full mt-8">Login</Button>
        </FormPrimitive.Submit>
      </div>
    </FormPrimitive.Root>
  );
}
