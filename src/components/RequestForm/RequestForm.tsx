"use client";

import React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import FileDragDrop from "../FileDragDrop";
import Button from "../ui/Button";
import Topbar1 from "../Topbar1";
import Image from "next/image";
import RequestFormOne from "./RequestFormOne";

const RequestForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [images, setImages] = React.useState<{ name: string; url: string }[]>(
    []
  );

  const [formStep, setFormStep] = React.useState(0);

  const forms = [<RequestFormOne key={0} />];

  const renderForm = () => {
    return forms[formStep];
  };

  const onClickCloseBtn = () => {
    const requestFormTrigger = document.getElementById("requestFormTrigger");
    if (requestFormTrigger) {
      requestFormTrigger.click();
    }
  };

  return (
    <FormPrimitive.Root className="pb-10 flex flex-col items-center bg-white max-h-[80vh] overflow-y-auto rounded-[20px]">
      <Topbar1
        leftComponent={
          <div className="text-white text-left font-body text-title_2 font-medium">
            {`${formStep + 1} of ${forms.length}`}
          </div>
        }
        middleComponent={
          <div className="text-white text-center font-headline text-headline_3 font-bold">
            Place a Request
          </div>
        }
        rightComponent={
          <Image
            src="/images/icons/closeIcon.png"
            width={32}
            height={32}
            alt="close"
            className="w-6 h-6 md:w-8 md:h-8 justify-self-end"
            onClick={onClickCloseBtn}
          />
        }
        className="px-5 md:px-[92px] py-4"
      />
      {forms[formStep]}

      <div className="w-full px-5 md:px-0">
        <Button className="mt-8 w-full md:w-fit px-0 md:px-20 py-2">
          Next
        </Button>
      </div>
      {/* 

      <FormPrimitive.Field
        name="images"
        className="px-5 md:px-[92px] mt-6 flex flex-col items-center gap-2 w-full"
      >
        <FormPrimitive.Control asChild>
          <FileDragDrop images={images} setImages={setImages} />
        </FormPrimitive.Control>

        <div className="flex items-baseline justify-between">
          <FormPrimitive.Label className="font-body text-title_3 font-medium">
            <span className="font-body text-title_3 font-medium text-[#000000]">
              Add Image
            </span>{" "}
            <span className="font-body text-body_2 font-light text-[#000000]">
              (optional)
            </span>
          </FormPrimitive.Label>
        </div>
      </FormPrimitive.Field>

      <FormPrimitive.Field
        name="request"
        className="px-5 md:px-[92px] mt-6 flex flex-col gap-1 w-full"
      >
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Label className="font-body text-title_3 font-medium text-black">
            Detailed Description{" "}
            <span className="font-body text-label text-[#000000]/60">
              (optional)
            </span>
          </FormPrimitive.Label>
        </div>

        <FormPrimitive.Control asChild>
          <textarea
            placeholder="It should be..."
            className="px-3 py-4 rounded-lg border-[1px] border-[#B7B9BC] placeholder:font-body placeholder:text-body_1 min-h-[118px] bg-white placeholder:text-[#000000]/60"
            required
          />
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <div className="px-4 w-full mt-8 md:mt-16 flex items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          <Button className="w-full max-w-[315px] py-[6px]">
            Post Request
          </Button>
        </FormPrimitive.Submit>
      </div>

      <div className="font-body text-special font-light text-black mt-6 px-5 md:px-[92px] text-center">
        Your post will be displayed for the general public while your identity
        is hidden but you can see responses by people with relevant information
      </div> */}
    </FormPrimitive.Root>
  );
});

RequestForm.displayName = "RequestForm";

export default RequestForm;
