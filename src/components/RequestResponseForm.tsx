"use client";

import React, { useState } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import FileDragDrop from "./FileDragDrop";
import VisibilityRadioGroup from "./ui/RequestVisibilityRadioGroup";
import Button from "./ui/Button";

const LocationOnIcon = React.lazy(
  () => import("@mui/icons-material/LocationOn")
);
const AttachMoneyIcon = React.lazy(
  () => import("@mui/icons-material/AttachMoney")
);
const WhatsAppIcon = React.lazy(() => import("@mui/icons-material/WhatsApp"));

const RequestResponseForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [commentInput, setCommentInput] = useState("");
  const [images, setImages] = React.useState<{ name: string; url: string }[]>(
    []
  );

  // const submitForm = () => {
  //   fetch('http://localhost:8000/api/responses',
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({''})
  //   })
  // }

  return (
    <FormPrimitive.Root className="py-8 flex flex-col items-center bg-white">
      <div className="font-headline text-headline_3 font-bold text-black px-5 pb-2 border-b-[1px] border-grey/20 w-full text-center">
        Respond to This Request
      </div>

      <FormPrimitive.Field
        name="comment"
        className="px-5 mt-8 flex flex-col gap-1 w-full"
      >
        <div className="flex items-baseline justify-between">
          <FormPrimitive.Label className="font-body text-title_3 font-medium">
            Comment
          </FormPrimitive.Label>

          <FormPrimitive.Message
            match={"valueMissing"}
            className="font-body text-body_3 text-black/80"
          >
            comment required
          </FormPrimitive.Message>
        </div>

        <FormPrimitive.Control asChild>
          <textarea
            placeholder="Here is what you are looking for..."
            className="px-3 py-4 rounded-lg border-[1px] border-stroke placeholder:font-body placeholder:text-body_1 min-h-[146px] bg-faded"
            required
            onChange={(e) => setCommentInput(e.target.value)}
          />
        </FormPrimitive.Control>
      </FormPrimitive.Field>

      <FormPrimitive.Field
        name="images"
        className="px-5 mt-8 flex flex-col items-center gap-2 w-full"
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

      <div className="w-full px-4">
        <FormPrimitive.Field
          name="location"
          className="relative h-fit mt-6 w-full flex flex-col"
        >
          <FormPrimitive.Message
            match={"valueMissing"}
            className="self-end font-body text-body_3 text-black/80"
          >
            location required
          </FormPrimitive.Message>

          <div className="relative h-fit w-full">
            <FormPrimitive.Control asChild>
              <input
                type="text"
                placeholder="Your location"
                className="font-body text-body_1 text-[#000000]/60 bg-faded pl-12 py-2 h-full w-full rounded-[4px]"
                required
              />
            </FormPrimitive.Control>
            <LocationOnIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
          </div>
        </FormPrimitive.Field>

        <FormPrimitive.Field
          name="price"
          className="relative h-fit mt-4 w-full"
        >
          <FormPrimitive.Control asChild>
            <input
              type="text"
              placeholder="Price (optional)"
              className="font-body text-body_1 text-[#000000]/60 bg-faded pl-12 py-2 h-full w-full rounded-[4px]"
            />
          </FormPrimitive.Control>
          <AttachMoneyIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
        </FormPrimitive.Field>

        <FormPrimitive.Field
          name="Whatsapp number"
          className="relative h-fit mt-4 w-full"
        >
          <FormPrimitive.Control asChild>
            <input
              type="text"
              placeholder="WhatsApp number"
              className="font-body text-body_1 text-[#000000]/60 bg-faded pl-12 py-2 h-full w-full rounded-[4px]"
            />
          </FormPrimitive.Control>
          <WhatsAppIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
        </FormPrimitive.Field>

        <VisibilityRadioGroup className="mt-6" />
      </div>

      <div className="px-4 w-full mt-6 flex items-center justify-center">
        <FormPrimitive.Submit asChild className="">
          <Button className="w-full max-w-[315px] py-[6px]">
            Send Response
          </Button>
        </FormPrimitive.Submit>
      </div>

      <div className="font-body text-body_3 text-[#000000] mt-3 px-5">
        Only post a response that aligns with this request
      </div>
    </FormPrimitive.Root>
  );
});

RequestResponseForm.displayName = "RequestResponseForm";

export default RequestResponseForm;
