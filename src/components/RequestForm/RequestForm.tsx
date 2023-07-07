"use client";

import React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import FileDragDrop from "../FileDragDrop";
import Topbar1 from "../Topbar1";
import Image from "next/image";
import RequestFormOne from "./RequestFormOne";
import RequestFormTwo from "./RequestFormTwo";
import { cn } from "@/app/lib/utils";
import RequestFormThree from "./RequestFormThree";
import { Close } from "../ui/DialogPrimitive";
import { useGlobalContext } from "@/app/context/Store";
import { postRequest } from "@/app/lib/request";
import { useFeedsContext } from "@/app/context/feedsContext";
import LoadingSpinner from "../LoadingSpinner";

const RequestForm = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [images, setImages] = React.useState<{ name: string; url: string }[]>(
    []
  );
  const [imageFile, setImageFile] = React.useState<FileList>();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [formStep, setFormStep] = React.useState(0);
  const { feeds, setFeeds } = useFeedsContext();

  const token = window.localStorage.getItem("token");
  const userDetails = window.localStorage.getItem("userDetails");
  const [category, setCategory] = React.useState<string | null>(null);
  const [categoryType, setCategoryType] = React.useState<number | null>(null);
  const [state, setState] = React.useState<string | null>(null);
  const [city, setCity] = React.useState<number | null>(null);
  const [isPosting, setIsPosting] = React.useState(false);

  React.useEffect(() => {
    if (!token || !userDetails) {
      window.location.replace("/login");
    }
  }, []);

  const forms = [
    <RequestFormOne
      key={0}
      className="mt-10 px-3 md:px-6 overflow-auto"
      setTitle={setTitle}
      category={category}
      setCategory={setCategory}
      categoryType={categoryType}
      setCategoryType={setCategoryType}
      state={state}
      setState={setState}
      city={city}
      setCity={setCity}
    />,
    <RequestFormTwo
      key={1}
      className="mt-10 px-3 md:px-6 md:overflow-hidden"
      images={images}
      setImages={setImages}
      setImageFile={setImageFile}
    />,
    <RequestFormThree
      key={2}
      className="mt-10 px-3 md:px-6 w-full md:overflow-auto"
      setDescription={setDescription}
    />,
  ];

  const onClickNextBtn = () => {
    setFormStep(formStep + 1);
  };

  const onClickBackBtn = () => {
    setFormStep(formStep - 1);
  };

  const onPostRequestClick = async () => {
    try {
      if (!token || !userDetails) {
        window.location.replace("/login");
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

        const res = await postRequest(token, data, headers);
        if (res.success) {
          if (feeds && feeds.data.length === feeds.meta.per_page) {
            feeds.data.length = feeds.meta.per_page - 1;
            setFeeds({ ...feeds, data: [res.data, ...feeds.data] });
            return;
          }
          if (feeds) {
            setFeeds({ ...feeds, data: [res.data, ...feeds.data] });
            return;
          }
          setFeeds(res.data);
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
    <FormPrimitive.Root className="relative pb-10 flex flex-col items-center bg-white h-[85vh] max-h-[800px] rounded-[20px] w-screen max-w-[600px]">
      <Topbar1
        leftComponent={
          <div className="text-white text-left font-body text-title_2 font-medium">
            {`${formStep + 1} of ${forms.length}`}
          </div>
        }
        middleComponent={
          <div className="text-white text-center font-headline text-headline_3 font-bold w-full self">
            Place a Request
          </div>
        }
        rightComponent={
          <Image
            src="/images/icons/closeIcon.png"
            width={32}
            height={32}
            alt="close"
            className="w-6 h-6 md:w-8 md:h-8 justify-self-end cursor-pointer"
            onClick={() => {
              const dialogCloseTrigger =
                document.getElementById("dialogCloseTrigger");
              if (dialogCloseTrigger) {
                dialogCloseTrigger.click();
              }
            }}
          />
        }
        className="px-5 py-4 fixed rounded-tl-[20px] rounded-tr-[20px] w-screen max-w-[600px]"
      />
      {forms[formStep]}

      <div
        className={cn(
          "mt-8 w-full px-3 md:px-6 flex justify-between items-center",
          formStep === 0 && "justify-center",
          formStep === 1 && "mt-20"
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
              "text-center font-body text-title_2 bg-primary rounded-xl px-12 md:px-20 py-2 text-white hover:cursor-pointer flex items-center",
              isPosting && "px-8"
            )}
            onClick={onPostRequestClick}
          >
            {isPosting && (
              <LoadingSpinner className="h-4 w-4 text-primary fill-white" />
            )}
            Post Request
          </div>
        ) : (
          <div
            className={cn(
              "text-center font-body text-title_2 bg-primary rounded-xl px-12 md:px-20 py-2 text-white hover:cursor-pointer md:max-w-[204px]",
              formStep < 1 && "w-full"
            )}
            onClick={onClickNextBtn}
          >
            Next
          </div>
        )}
      </div>
    </FormPrimitive.Root>
  );
});

RequestForm.displayName = "RequestForm";

export default RequestForm;
