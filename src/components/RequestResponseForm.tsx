"use client";

import React, { useState } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import VisibilityRadioGroup from "./ui/RequestVisibilityRadioGroup";
import Button from "./ui/Button";
import { cn } from "@/app/lib/utils";
import { usePathname } from "next/navigation";
import { postResponse, updateResponse } from "@/app/lib/repsonse";
import LoadingSpinner from "./LoadingSpinner";
import { getCities } from "@/app/lib/city";
import {
  CityInterface,
  RequestDetailResponseType,
  RequestDetailType,
} from "@/app/types";
import Dialog from "./ui/DialogPrimitive";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { DialogClose } from "@radix-ui/react-dialog";
import { useResponseContext } from "@/app/context/responseContext";

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
const ChevronRightIcon = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);
const ArrowBackIcon = React.lazy(() => import("@mui/icons-material/ArrowBack"));

const RequestResponseForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root> & {
    setRequests?: React.Dispatch<
      React.SetStateAction<RequestDetailType | null>
    >;
    requestData?: RequestDetailType | null;
    responsePrefill?: {
      description: string;
      responseid: number;
      location: string;
      title: string;
      user_id: number;
      price: number;
      whatsapp_num: string;
      whatsapp_link: string;
    };
  }
>(({ className, setRequests, requestData, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(props.responsePrefill?.title || "");
  const [visibility, setVisibility] = useState<"private" | "public">("public");
  const [price, setPrice] = useState(
    props.responsePrefill?.price ? props.responsePrefill.price.toString() : ""
  );
  const [whatsappNum, setWhatsappNum] = useState(
    props.responsePrefill?.whatsapp_num || ""
  );
  const [image, setImage] = React.useState<{
    name: string;
    url: string;
  } | null>(null);
  const [imageFile, setImageFile] = React.useState<FileList>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [city, setCity] = React.useState<number | null>(
    Number(props.responsePrefill?.location) || null
  );
  const [errors, setErrors] = React.useState<{
    [errorName: string]: string[];
  } | null>(null);
  const pathUrl = usePathname();
  const { setResponseStatus } = useResponseContext();

  const requestId = pathUrl.split("/")[2];

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors(null);
    e.preventDefault();
    setIsLoading(true);
    const token = window.localStorage.getItem("token");
    const userDetails = window.localStorage.getItem("userDetails");

    if (!city || !whatsappNum) {
      let errorsTemp: {
        [errorName: string]: string[];
      } = {};
      if (!city) {
        errorsTemp["location"] = ["location required"];
      }
      if (!whatsappNum) {
        errorsTemp["whatsapp_num"] = ["location required"];
      }

      setErrors({ ...errorsTemp });
      setIsLoading(false);
      return;
    }

    try {
      if (!token || !userDetails) {
        window.location.href = "/login";
      } else {
        const headers = new Headers();
        headers.append("Accept", "application/json");
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
        if (city) data.append("location_id", city?.toString());

        const res = props.responsePrefill
          ? await updateResponse(
              Number(props.responsePrefill?.responseid),
              headers,
              data
            )
          : await postResponse(headers, data);

        if (res.success) {
          if (requestData && setRequests) {
            let newResData = {
              ...res.data,
              user: JSON.parse(userDetails).data.name,
            };
            setRequests({
              ...requestData,
              responses: [newResData, ...requestData.responses],
            });
          }
          setResponseStatus("SUCCESS");
        }

        if (res.isError) {
          window.localStorage.removeItem("userDetails");
          window.location.href = "/login";
          return;
        }

        if (res.error) {
          setErrors(res.errors);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      const dialogClose = document.getElementById("dialogCloseTrigger");
      if (dialogClose) dialogClose.click();
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
        props.responsePrefill && "md:max-h-[600px]",
        className
      )}
      onSubmit={(e) => submitForm(e)}
    >
      <div className="fixed md:relative w-full flex justify-between items-center px-5">
        <div className="font-headline text-headline_3 font-bold text-black text-left md:pb-2 md:text-center md:border-b-[1px] md:border-grey/20 w-full">
          {props.responsePrefill
            ? "Update Response"
            : "Respond to This Request"}
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
              value={title}
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <FormPrimitive.Field
          name="image"
          className="relative w-full h-fit mt-6 hover:cursor-pointer"
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
            <div className="flex items-center gap-3 w-full">
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
            {errors && errors.location?.length > 0 && (
              <div className="font-body text-body_3 text-[red]/60">
                location required
              </div>
            )}

            <div className="relative h-fit w-full">
              <FormPrimitive.Control asChild>
                <SelectLocation setCity={setCity} className="w-full" />
              </FormPrimitive.Control>
              <LocationOnIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
            </div>
          </FormPrimitive.Field>

          <FormPrimitive.Field
            name="price"
            className="relative h-fit mt-4 w-full"
          >
            {errors &&
              errors.price?.length > 0 &&
              errors.price.map((errorItem) => {
                return (
                  <div
                    className="font-body text-body_3 text-[red]/60"
                    key={errorItem}
                  >
                    {errorItem}
                  </div>
                );
              })}

            <div className="relative h-fit w-full">
              <FormPrimitive.Control asChild>
                <input
                  type="text"
                  placeholder="Price (optional)"
                  className="font-body text-body_1 text-[#000000]/60 bg-faded pl-12 py-2 h-full w-full rounded-[4px]"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </FormPrimitive.Control>
              <AttachMoneyIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
            </div>
          </FormPrimitive.Field>

          <div className="w-full h-fit mt-4">
            {errors && errors.whatsapp_num?.length > 0 && (
              <div className="font-body text-body_3 text-[red]/60">
                whatsapp number required
              </div>
            )}

            <FormPrimitive.Field
              name="Whatsapp number"
              className="relative h-fit w-full"
            >
              <FormPrimitive.Control asChild>
                <input
                  type="text"
                  placeholder="WhatsApp number"
                  className="font-body text-body_1 text-[#000000]/60 bg-faded pl-12 py-2 h-full w-full rounded-[4px]"
                  onChange={(e) => setWhatsappNum(e.target.value)}
                  value={whatsappNum}
                />
              </FormPrimitive.Control>
              <WhatsAppIcon className="absolute top-1/2 -translate-y-1/2 left-4 text-[#424040] w-[19.89px] h-[25.11px]" />
            </FormPrimitive.Field>
          </div>

          <VisibilityRadioGroup
            setVisibility={setVisibility}
            className="mt-6"
          />
          {/* <RadioSelect /> */}
        </div>

        <div className="w-full mt-6 flex items-center justify-center">
          {isLoading ? (
            <Button className="w-full max-w-[315px] py-[6px]" disabled>
              <LoadingSpinner className="h-4 w-4 text-primary fill-white" />
              {props.responsePrefill
                ? "Updating Response.."
                : "Sending Response..."}
            </Button>
          ) : (
            <FormPrimitive.Submit asChild className="">
              <Button className="w-full max-w-[315px] py-[6px]">
                {props.responsePrefill ? "Update Response" : "Send Response"}
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

const SelectLocation = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    setCity: React.Dispatch<React.SetStateAction<number | null>>;
  }
>(({ className, setCity, ...props }, forwardRef) => {
  const [cityName, setCityName] = React.useState<string | null>(null);
  const [state, setState] = React.useState<string | null>(null);
  const [stateCities, setStateCities] = React.useState<{
    [id: string]: CityInterface[];
  } | null>(null);

  const states = stateCities ? Object.keys(stateCities) : null;

  React.useEffect(() => {
    const stateCitiesIntermediate = window.localStorage.getItem("cities");

    if (!stateCitiesIntermediate) {
      (async () => {
        try {
          const citiesRes = await getCities();
          window.localStorage.setItem("cities", JSON.stringify(citiesRes));
          setStateCities(citiesRes);
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      setStateCities(JSON.parse(stateCitiesIntermediate));
    }
  }, []);

  return (
    <div>
      <Dialog
        dialogTrigger={
          <div className="flex w-full items-center gap-3 font-body text-body_1 text-[#000000]/60 bg-faded pl-4 py-2 rounded-[4px] hover:cursor-pointer">
            <React.Suspense
              fallback={
                <div className="w-6 h-6 bg-stroke/60 animate-pulse"></div>
              }
            >
              <LocationOnIcon className=" text-[#424040] w-[19.89px] h-[25.11px]" />
            </React.Suspense>
            <span
              className={cn(
                "font-body text-body_1  text-[#000000]/40",
                cityName && "text-[#000000]/60"
              )}
            >
              {cityName ? cityName : "Your location"}
            </span>
          </div>
        }
        className="fixed top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2"
      >
        <div className="bg-white max-h-[500px] w-[80vw] max-w-[360px]">
          <div>
            <div className="px-4 pt-10 pb-4 border-b border-[#000000]/10 flex flex-col gap-8">
              <h3 className="font-headline text-headline_3 font-bold">
                Select your location
              </h3>
              {state ? (
                <div
                  className="flex gap-4 items-center hover:cursor-pointer"
                  onClick={() => setState(null)}
                >
                  <React.Suspense
                    fallback={
                      <div className="w-4 h-4 bg-stroke/60 animate-pulse"></div>
                    }
                  >
                    <ArrowBackIcon className="w-4 h-4" />
                  </React.Suspense>

                  <h4 className="font-body text-lg font-medium text-[#000000]/60">
                    {state}
                  </h4>
                </div>
              ) : (
                <h4 className="font-body text-lg font-medium text-[#000000]/60">
                  States
                </h4>
              )}
            </div>
            <div className="p-4 flex flex-col gap-4 div max-h-[268px] overflow-auto">
              {state && stateCities
                ? stateCities[state].map((city) => {
                    return (
                      <DialogClose asChild key={city.id}>
                        <div
                          className="hover:bg-stroke/20 hover:cursor-pointer"
                          onClick={() => {
                            setCity(city.id);
                            setCityName(city.city);
                            setState(null);
                          }}
                        >
                          {city.city}
                        </div>
                      </DialogClose>
                    );
                  })
                : states?.map((state, index) => {
                    return (
                      <div
                        className="hover:bg-stroke/20 hover:cursor-pointer flex items-center justify-between"
                        key={index}
                        onClick={() => setState(state)}
                      >
                        {state}

                        <React.Suspense
                          fallback={
                            <div className="w-5 h-5 bg-stroke/60 animate-pulse"></div>
                          }
                        >
                          <ChevronRightIcon className="w-5 h-5 text-[#000000]/60" />
                        </React.Suspense>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
});

SelectLocation.displayName = "SelectLocation";

const RadioSelect = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, forwardRef) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("", className)}
      {...props}
      onValueChange={(e) => console.log("dlfjs")}
    >
      <div>
        <RadioGroupPrimitive.Item value="public" id="public">
          <RadioGroupPrimitive.Indicator />
        </RadioGroupPrimitive.Item>
        <label htmlFor="public">Public</label>
      </div>
      <div>
        <RadioGroupPrimitive.Item value="private" id="private">
          <RadioGroupPrimitive.Indicator />
        </RadioGroupPrimitive.Item>
        <label htmlFor="private">Private</label>
      </div>
    </RadioGroupPrimitive.Root>
  );
});

RadioSelect.displayName = "RadioSelect";
