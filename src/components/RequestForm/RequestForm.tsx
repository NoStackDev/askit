"use client";

import React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import Image from "next/image";
import RequestFormOne from "./RequestFormOne";
import RequestFormTwo from "./RequestFormTwo";
import { cn } from "@/app/lib/utils";
import RequestFormThree from "./RequestFormThree";
import { postRequest, updateRequest } from "@/app/lib/request";
import { useFeedsContext } from "@/app/context/feedsContext";
import LoadingSpinner from "../LoadingSpinner";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRequestContext } from "@/app/context/requestContext";
import { RequestType } from "@/app/types";
import useCategory from "@/hooks/useCategory";
import useLocations from "@/hooks/useLocation";

const RequestForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root> & {
    prefill?: Partial<RequestType>;
  }
>(({ className, prefill, ...props }, ref) => {
  const [images, setImages] = React.useState<{ name: string; url: string }[]>(
    []
  );
  const [imageFile, setImageFile] = React.useState<FileList>();
  const [title, setTitle] = React.useState(prefill?.title || "");
  const [description, setDescription] = React.useState(
    prefill?.description || ""
  );

  const [formStep, setFormStep] = React.useState(0);
  const { feeds, setFeeds } = useFeedsContext();

  const token = window.localStorage.getItem("token");
  const userDetails = window.localStorage.getItem("userDetails");
  const [category, setCategory] = React.useState<string | null>(null);
  const [categoryType, setCategoryType] = React.useState<number | null>(null);
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<number | null>(null);
  const [isPosting, setIsPosting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<{
    title: { errors: string[]; showErrors: boolean };
    category: { errors: string[]; showErrors: boolean };
    location: { errors: string[]; showErrors: boolean };
  }>({
    title: {
      errors: ["title required", "minimum of 32 characters"],
      showErrors: false,
    },
    category: { errors: ["category required"], showErrors: false },
    location: { errors: ["location required"], showErrors: false },
  });
  const { setRequestStatus } = useRequestContext();
  const [categories, flattenedCategories] = useCategory();
  const [locations, flattenedLocations] = useLocations();

  React.useEffect(() => {
    if (!token || !userDetails) {
      window.location.href = "/login";
    }
  }, []);

  React.useEffect(() => {
    if (prefill && prefill.category) {
      flattenedCategories?.forEach((category) => {
        if (category.name === prefill.category) {
          setCategoryType(category.id);
        }
      });
    }
  }, [flattenedCategories]);

  React.useEffect(() => {
    if (prefill && prefill.location) {
      flattenedLocations?.forEach((location) => {
        if (location.city === prefill.location) {
          setCity(location.id);
        }
      });
    }
  }, [flattenedLocations]);

  const forms = [
    <RequestFormOne
      key={0}
      title={title}
      setTitle={setTitle}
      category={category}
      setCategory={setCategory}
      categoryType={categoryType}
      setCategoryType={setCategoryType}
      state={state}
      setState={setState}
      city={city}
      setCity={setCity}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
    />,
    <RequestFormTwo
      key={1}
      images={images}
      setImages={setImages}
      setImageFile={setImageFile}
    />,
    <RequestFormThree
      key={2}
      className="w-full md:overflow-auto"
      setDescription={setDescription}
    />,
  ];

  const onClickNextBtn = () => {
    if (formStep === 0) {
      let titleErrors: string[] = [];
      let categoryTypeErrors: string[] = [];
      let cityErrors: string[] = [];

      title.trim().length > 0
        ? titleErrors.shift()
        : titleErrors.unshift("title required");

      title.trim().length >= 32
        ? titleErrors.pop()
        : titleErrors.push("minimum of 32 characters");

      categoryType
        ? categoryTypeErrors.shift()
        : categoryTypeErrors.unshift("category required");

      city ? cityErrors.shift() : cityErrors.unshift("location required");

      setFormErrors({
        title: {
          errors: titleErrors,
          showErrors: formErrors.title.errors.length > 0 ? true : false,
        },
        category: {
          errors: categoryTypeErrors,
          showErrors: formErrors.category.errors.length > 0 ? true : false,
        },
        location: {
          errors: cityErrors,
          showErrors: formErrors.location.errors.length > 0 ? true : false,
        },
      });

      if (
        titleErrors.length > 0 ||
        categoryTypeErrors.length > 0 ||
        cityErrors.length > 0
      )
        return;
    }
    setFormStep(formStep + 1);
  };

  const onClickBackBtn = () => {
    setFormStep(formStep - 1);
  };

  const onPostRequestClick = async () => {
    try {
      if (!token || !userDetails) {
        window.location.href = "/login";
      } else {
        setIsPosting(true);
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const data = new FormData();
        data.append("title", title);
        data.append("user_id", JSON.parse(userDetails).data.id);
        if (imageFile) {
          data.append("image", imageFile[0], imageFile[0].name);
        }
        data.append("description", description);
        if (categoryType)
          data.append("category_group_id", categoryType.toString());
        if (city) {
          data.append("location_id", city.toString());
        }

        const res = prefill
          ? await updateRequest(Number(prefill?.id), headers, data)
          : await postRequest(data, headers);
        if (res.success) {
          if (prefill) {
            window.location.reload();
            return;
          }

          if (feeds && feeds.data.length === feeds.meta.per_page) {
            feeds.data.length = feeds.meta.per_page - 1;
            setFeeds({ ...feeds, data: [res.data, ...feeds.data] });
            setRequestStatus("SUCCESS");
            return;
          }
          if (feeds) {
            setFeeds({ ...feeds, data: [res.data, ...feeds.data] });
            setRequestStatus("SUCCESS");
            return;
          }
          setFeeds(res.data);
          setRequestStatus("SUCCESS");
          setRequestStatus("SUCCESS");
          return;
        }

        if (res.isError) {
          window.localStorage.removeItem("userDetails");
          window.location.href = "/login";
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPosting(false);
      const dialogClose = document.getElementById("dialogCloseTrigger");
      if (dialogClose) dialogClose.click();
    }
  };

  return (
    <FormPrimitive.Root className="relative flex flex-col items-center bg-white h-full md:max-h-[700px] w-screen md:max-w-[600px] p-5 md:px-6 md:rounded-[20px]">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-headline font-bold text-body_2 text-secondary/80">
          {prefill ? "UPDATE " : "PLACE A "} REQUEST
        </h1>
        <DialogClose asChild>
          <div className="font-body text-title_3 text-[#000000] font-medium hover:cursor-pointer">
            CANCEL
          </div>
        </DialogClose>
      </div>

      <div className="font-body text-body_2 text-[#000000]/60 font-normal self-start mt-11 mb-2">
        {formStep + 1} of {forms.length}
      </div>

      <div className="w-full h-fit overflow-y-auto">
        {forms[formStep]}

        <div
          className={cn(
            "w-full flex justify-between items-end",
            formStep === 0 && "justify-center",
            formStep === 1 && ""
          )}
        >
          {formStep > 0 ? (
            <div
              className={cn(
                "flex gap-1 items-center px-5 py-2 border rounded-xl border-[#000000] hover:cursor-pointer"
              )}
              onClick={onClickBackBtn}
            >
              <Image
                src="/images/icons/arrowRequestForm.png"
                height={24}
                width={24}
                alt="back"
              />

              <span>Back</span>
            </div>
          ) : null}

          {formStep + 1 === forms.length ? (
            <div
              className={cn(
                "text-center font-body text-title_2 bg-primary rounded-xl px-12 md:px-20 py-2 text-white hover:cursor-pointer flex items-center mt-6 min-w-[200px]",
                isPosting && "px-8"
              )}
              onClick={onPostRequestClick}
            >
              {isPosting && (
                <LoadingSpinner className="h-4 w-4 text-primary fill-white" />
              )}
              {!isPosting && !prefill && "Post Request"}
              {isPosting && !prefill && "Posting"}
              {!isPosting && prefill && "Update Request"}
              {isPosting && prefill && "Updating"}
            </div>
          ) : (
            <div
              className={cn(
                "text-center font-body text-title_2 bg-primary rounded-xl px-12 md:px-20 py-2 text-white hover:cursor-pointer md:max-w-[204px] mt-6",
                formStep < 1 && "w-full"
              )}
              onClick={onClickNextBtn}
            >
              Next
            </div>
          )}
        </div>
      </div>
    </FormPrimitive.Root>
  );
});

RequestForm.displayName = "RequestForm";

export default RequestForm;
