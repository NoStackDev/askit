"use client";

import React, { FormEvent, MouseEvent } from "react";

import * as FormPrimitive from "@radix-ui/react-form";
import Button from "./ui/Button";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { loginUser, registerUser } from "@/app/lib/user";
import { cn } from "@/app/lib/utils";
import getUser from "@/app/lib/user/getUser";
import { useGlobalContext } from "@/app/context/Store";
import { useAuthContext } from "@/app/context/authContext";
import LoadingSpinner from "./LoadingSpinner";

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
  const { isLoading, isSuccess, isError, isOnboarding, dispatch } =
    useAuthContext();

  const onSignUpClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await registerUser({ name, email, password }, dispatch);
      if (userData) {
        setUser({ authEmail: email, authPassword: password });
        dispatch({ type: "REGISTRATION_SUCCESSFUL" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "FAILURE" });
    }
  };

  const onLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const loginRes = loginUser({ email, password });
      const loginData = await loginRes;

      if (loginData.token) {
        setToken(loginData.token);
        window.localStorage.setItem("token", loginData.token);
        const userDetails = await getUser(loginData.token);

        if (userDetails) {
          window.localStorage.setItem(
            "userDetails",
            JSON.stringify(userDetails)
          );
          dispatch({ type: "LOGIN_SUCCESSFUL" });
          window.location.href = "/";
        }
      }
    } catch (err) {
      dispatch({ type: "FAILURE" });
      console.log(err);
    } finally {
      dispatch({ type: "RESET" });
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
            <span className="font-body text-body_2 text-secondary">
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
            <span className="font-body text-body_2 text-secondary">
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
  const { isLoading, isSuccess, isError, isOnboarding, dispatch } =
    useAuthContext();

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
              type="password"
              placeholder="Create Password"
              className="pl-3 w-full py-[6px] font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <div className="w-full h-fit flex flex-col items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          {isLoading ? (
            <Button className="w-full mt-8 rounded" disabled>
              <LoadingSpinner className="w-4 h-4 text-primary fill-white" />{" "}
              Signing Up
            </Button>
          ) : (
            <Button className="w-full mt-8 rounded">Sign Up</Button>
          )}
        </FormPrimitive.Submit>

        {isError && (
          <div className="mt-2 text-[red]/80 opacity-80 text-xs font-body">
            error: Sign up failed
          </div>
        )}
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
  const { isLoading, isSuccess, isError, isOnboarding, dispatch } =
    useAuthContext();

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
              type="password"
              placeholder="Password"
              className="pl-3 py-[6px] font-body font-medium text-title_2 placeholder:font-body placeholder:font-medium placeholder:text-title_2 bg-faded placeholder:text-[#000000]/60 w-full"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormPrimitive.Control>
        </div>
      </FormPrimitive.Field>

      <div className="w-full h-fit flex flex-col items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          {isLoading ? (
            <Button className="w-full mt-2 rounded" disabled>
              <LoadingSpinner className="w-4 h-4 text-primary fill-white" />{" "}
              Logging in
            </Button>
          ) : (
            <Button className="w-full mt-2 rounded">Login</Button>
          )}
        </FormPrimitive.Submit>

        {isError && (
          <div className="mt-2 text-[red]/80 opacity-80 text-xs font-body">
            error: login failed
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <Link
          href={"/recoverpassword"}
          className="font-body text-title_3 font-medium text-black"
        >
          Forgot Password?
        </Link>
      </div>
    </FormPrimitive.Root>
  );
}
