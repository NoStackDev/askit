"use client";

import React, { useState } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import FileDragDrop from "./FileDragDrop";
import VisibilityRadioGroup from "./ui/RequestVisibilityRadioGroup";
import Button from "./ui/Button";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { usePathname } from "next/navigation";
import { postResponse } from "@/app/lib/repsonse";

const LocationOnIcon = React.lazy(
  () => import("@mui/icons-material/LocationOn")
);
const AttachMoneyIcon = React.lazy(
  () => import("@mui/icons-material/AttachMoney")
);
const WhatsAppIcon = React.lazy(() => import("@mui/icons-material/WhatsApp"));
const ImageIcon = React.lazy(() => import("@mui/icons-material/Image"));
const CancelIcon = React.lazy(() => import("@mui/icons-material/Cancel"));
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));

const RequestResponseForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("public");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  const [image, setImage] = React.useState<{
    name: string;
    url: string;
  } | null>(null);
  const [imageFile, setImageFile] = React.useState<FileList>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const pathUrl = usePathname();

  const requestId = pathUrl.split("/")[2];

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const token = window.localStorage.getItem("token");
    const userDetails = window.localStorage.getItem("userDetails");

    try {
      if (!token || !userDetails) {
        window.location.replace("/login");
      } else {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        // headers.append("Content-Type", "multipart/form-data");
        headers.append("Authorization", `Bearer ${token}`);

        const data = new FormData();
        data.append("title", title);
        data.append("description", title);
        data.append("user_id", JSON.parse(userDetails).data.id);
        data.append("req_id", requestId);
        if (imageFile) {
          data.append("image", imageFile[0], imageFile[0].name);
        }
        data.append("whatsapp_num", whatsappNum);
        data.append("price", price);
        data.append("visibility", visibility);
        data.append("location_id", "1");

        const res = await postResponse(headers, data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  const onFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;
    if (!files || files?.length === 0) return;
    setImageFile(files);

    setImage({ name: files[0].name, url: URL.createObjectURL(files[0]) });
  };

  const onRemoveImage = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setImage(null);
  };

  return (
    <FormPrimitive.Root
      className={cn(
        "relative py-8 flex flex-col items-center bg-white h-full md:h-fit",
        className
      )}
      onSubmit={(e) => submitForm(e)}
    >
      <div className="fixed md:relative w-full flex justify-between items-center px-5">
        <div className="font-headline text-headline_3 font-bold text-black text-left md:pb-2 md:text-center md:border-b-[1px] md:border-grey/20 w-full">
          Respond to This Request
        </div>

        <React.Suspense
          fallback={
            <div className="md:hidden w-6 h-6 bg-stroke/60 animate-pulse"></div>
          }
        >
          <CloseIcon
            className="w-6 h-6 md:hidden"
            onClick={() => {
              const dialogCloseTrigger =
                document.getElementById("dialogCloseTrigger");
              if (dialogCloseTrigger) {
                dialogCloseTrigger.click();
              }
            }}
          />
        </React.Suspense>
      </div>

      <div className="px-5 mt-10 md:mt-0 overflow-auto">
        <FormPrimitive.Field
          name="comment"
          className="mt-8 flex flex-col gap-1"
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Field
          name="image"
          className="relative w-fit h-fit mt-6 hover:cursor-pointer"
          onClick={onFileInputClick}
        >
          <FormPrimitive.Control asChild>
            <input
              type="file"
              name="image"
              id="responseImage"
              className="w-9/12 opacity-0"
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="image/png, image/jpg, image/jpeg"
            />
          </FormPrimitive.Control>

          <div className="absolute top-0 h-full w-full flex items-center justify-between px-4 py-2  border border-stroke rounded">
            <div className="flex items-center gap-3">
              <React.Suspense
                fallback={
                  <div className="w-[24px] h-[24px] bg-stroke/60 animate-pulse"></div>
                }
              >
                <ImageIcon className="text-[#000000]/60 w-[17px] h-[17px]" />
              </React.Suspense>
              {image ? (
                <span className="font-body text-title_3 text-[#000000]/60 font-light max-w-[24ch] overflow-hidden truncate">
                  {image.name}
                </span>
              ) : (
                <span className="font-body text-title_3 text-[#000000]/60 font-light">
                  Add Image (optional)
                </span>
              )}
            </div>

            <>
              {image ? (
                <React.Suspense>
                  <CancelIcon
                    className="text-[#000000]/60 w-4 h-4"
                    onClick={(e) => onRemoveImage(e)}
                  />
                </React.Suspense>
              ) : null}
            </>
          </div>
        </FormPrimitive.Field>

        <div className="w-full">
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setWhatsappNum(e.target.value)}
              />
            </FormPrimitive.Control>
            <WhatsAppIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
          </FormPrimitive.Field>

          <VisibilityRadioGroup
            setVisibility={setVisibility}
            className="mt-6"
          />
        </div>

        <div className="w-full mt-6 flex items-center justify-center">
          {isLoading ? (
            <Button className="w-full max-w-[315px] py-[6px]" disabled>
              Sending Response...
            </Button>
          ) : (
            <FormPrimitive.Submit asChild className="">
              <Button className="w-full max-w-[315px] py-[6px]">
                Send Response
              </Button>
            </FormPrimitive.Submit>
          )}
        </div>

        <div className="font-body text-body_3 text-[#000000] text-center mt-3">
          Only post a response that aligns with this request
        </div>
      </div>
    </FormPrimitive.Root>
  );
});

RequestResponseForm.displayName = "RequestResponseForm";

export default RequestResponseForm;
