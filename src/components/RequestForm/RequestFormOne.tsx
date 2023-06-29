import React, { HTMLAttributes } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

import * as FormPrimitive from "@radix-ui/react-form";
import { cn } from "@/app/lib/utils";

interface FormOneI {
  title: string;
  categoryId: number;
  subCategoryId: number;
  stateId: number;
  cityId: number;
}

const RequestFormOne = React.forwardRef<
  React.ElementRef<"div">,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, fowardref) => {
  return (
    <div className={cn("h-full w-full", className)} ref={fowardref} {...props}>
      <h2 className="mt-8 font-headline text-headline_2 font-bold text-[#000000] text-left">
        Tell us What You’re Looking For and Where!
      </h2>

      <FormPrimitive.Field
        name="request"
        className="mt-8 flex flex-col gap-1 w-full"
      >
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            request title is required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild>
          <textarea
            placeholder="I am looking for..."
            className="p-6 rounded-lg border-[1px] border-stroke placeholder:font-body placeholder:text-body_1 min-h-20 bg-faded placeholder:text-[#000000]/60"
            required
          />
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <div className="mt-8 ">
        <div className="font-body text-title_3 font-medium text-black">
          Choose perfect category
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-5 items-center">
          <FormPrimitive.Field
            name="category"
            className="flex flex-col gap-1 w-full"
          >
            <div className="flex items-baseline justify-between">
              <FormPrimitive.Message
                match={"valueMissing"}
                className="font-body text-body_3 text-black/80"
              >
                request category is required
              </FormPrimitive.Message>
            </div>

            <FormPrimitive.Control asChild>
              <Select>
                <SelectTrigger
                  className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                  aria-label="Category"
                  icon={<div>x</div>}
                >
                  <SelectValue placeholder="Choose" className="" />
                </SelectTrigger>

                <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="accomodation">Accomodation</SelectItem>
                    <SelectItem value="jobs">Jobs</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormPrimitive.Control>
          </FormPrimitive.Field>

          <FormPrimitive.Field
            name="sub category"
            className="flex flex-col gap-1 w-full"
          >
            <div className="flex items-baseline justify-between">
              <FormPrimitive.Message
                match={"valueMissing"}
                className="font-body text-body_3 text-black/80"
              >
                request type is required
              </FormPrimitive.Message>
            </div>

            <FormPrimitive.Control asChild>
              <Select>
                <SelectTrigger
                  className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                  aria-label="Sub Category"
                  icon={<div>x</div>}
                >
                  <SelectValue placeholder="Select type" className="" />
                </SelectTrigger>

                <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="accomodation">Accomodation</SelectItem>
                    <SelectItem value="jobs">Jobs</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormPrimitive.Control>
          </FormPrimitive.Field>
        </div>
      </div>

      <div className="mt-8 ">
        <div className="font-body text-title_3 font-medium text-black">
          Where will you want it?
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-5 items-center">
          <FormPrimitive.Field
            name="state"
            className="mt-1 flex flex-col gap-1 w-full"
          >
            <div className="flex items-baseline justify-between">
              <FormPrimitive.Message
                match={"valueMissing"}
                className="font-body text-body_3 text-black/80"
              >
                request state is required
              </FormPrimitive.Message>
            </div>

            <FormPrimitive.Control asChild>
              <Select>
                <SelectTrigger
                  className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                  aria-label="state"
                  icon={<div>x</div>}
                >
                  <SelectValue placeholder="Select state" className="" />
                </SelectTrigger>

                <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                  <SelectGroup>
                    <SelectLabel>State</SelectLabel>
                    <SelectItem value="services">Rivers</SelectItem>
                    <SelectItem value="products">Lagos</SelectItem>
                    <SelectItem value="accomodation">Abuja</SelectItem>
                    <SelectItem value="jobs">Kano</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormPrimitive.Control>
          </FormPrimitive.Field>

          <FormPrimitive.Field
            name="category"
            className="flex flex-col gap-1 w-full"
          >
            <div className="flex items-baseline justify-between">
              <FormPrimitive.Message
                match={"valueMissing"}
                className="font-body text-body_3 text-black/80"
              >
                request city is required
              </FormPrimitive.Message>
            </div>

            <FormPrimitive.Control asChild>
              <Select>
                <SelectTrigger
                  className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                  aria-label="Category"
                  icon={<div>x</div>}
                >
                  <SelectValue placeholder="Select city" className="" />
                </SelectTrigger>

                <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                  <SelectGroup>
                    <SelectLabel>City</SelectLabel>
                    <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Abuja">Abuja</SelectItem>
                    <SelectItem value="Kano">Kano</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormPrimitive.Control>
          </FormPrimitive.Field>
        </div>
      </div>
    </div>
  );
});

RequestFormOne.displayName = "RequestFormOne";

export default RequestFormOne;
