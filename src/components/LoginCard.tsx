"use client";

import { cn } from "@/lib/utils";
import React from "react";

import * as FormPrimitive from "@radix-ui/react-form";
import Button from "./ui/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PersonIcon = React.lazy(() => import("@mui/icons-material/Person"));
const MailIcon = React.lazy(() => import("@mui/icons-material/Mail"));
const LockIcon = React.lazy(() => import("@mui/icons-material/Lock"));

type Props = {};

const LoginCard = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const path = usePathname();
  const pathUrl = path.split("/")[1];
  let renderLogin = Boolean(pathUrl === "login");

  return (
    <div
      ref={ref}
      className={cn(
        "bg-[#F3F3F3] pt-10 pb-6 px-4 z-20 h-fit rounded-[20px] shadow-boxShadow_6 border-[4px] border-black w-[342px] flex flex-col items-center",
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
        <LoginForm className="mt-10" />
      ) : (
        <SignUpForm className="mt-14" />
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

function SignUpForm({ className }: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <FormPrimitive.Root className={cn("flex flex-col gap-6 w-full", className)}>
      <FormPrimitive.Field name="name">
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            name required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild className="w-full">
          <div className="h-fit w-fit flex rounded border-[2px] border-stroke">
            <React.Suspense>
              <PersonIcon
                className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
                fontSize="large"
              />
            </React.Suspense>
            <input
              type="text"
              placeholder="Your Names"
              className="pl-3 py-[6px] w-full font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
            />
          </div>
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="email">
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            email required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild className="w-full">
          <div className="h-fit w-fit flex rounded border-[2px] border-stroke">
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
              required
            />
          </div>
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="Password">
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            password required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild className="w-full">
          <div className="h-fit w-fit flex rounded border-[2px] border-stroke">
            <React.Suspense>
              <LockIcon
                className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
                fontSize="large"
              />
            </React.Suspense>
            <input
              type="text"
              placeholder="Create Password"
              className="pl-3 w-full py-[6px] font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
            />
          </div>
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <div className="w-full h-fit flex items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          <Button className="w-full mt-8">Sign Up</Button>
        </FormPrimitive.Submit>
      </div>
    </FormPrimitive.Root>
  );
}

function LoginForm({ className }: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <FormPrimitive.Root className={cn("flex flex-col gap-6 w-full", className)}>
      <FormPrimitive.Field name="email">
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            email required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild className="w-full">
          <div className="h-fit w-fit rounded border-[2px] border-stroke flex">
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
              required
            />
          </div>
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <FormPrimitive.Field name="Password">
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            password required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild className="w-full">
          <div className="h-fit w-fit flex rounded border-[2px] border-stroke">
            <React.Suspense>
              <LockIcon
                className="border-r-[2px] border-stroke rounded w-10 h-10 p-[6px]"
                fontSize="large"
              />
            </React.Suspense>
            <input
              type="text"
              placeholder="Create Password"
              className="pl-3 py-[6px] font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60 w-full"
              required
            />
          </div>
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <div className="w-full h-fit flex items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          <Button className="w-full mt-8">Login</Button>
        </FormPrimitive.Submit>
      </div>
    </FormPrimitive.Root>
  );
}
