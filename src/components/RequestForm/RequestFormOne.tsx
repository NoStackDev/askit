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
import { sidebarConfig1 } from "@/config.ts/sidebarConfig";
import { statesConfig } from "@/config.ts/cities";
import { useGlobalContext } from "@/app/context/Store";
import { useSidebarContext } from "@/app/context/sidebarContext";
import { CategoryType, CityInterface, StateCitiesInterface } from "@/app/types";
import { getCities } from "@/app/lib/city";
import { getCategories } from "@/app/lib/category";
const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);

interface FormOneI {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  categoryType: number | null;
  setCategoryType: React.Dispatch<React.SetStateAction<number | null>>;
  state: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  city: number | null;
  setCity: React.Dispatch<React.SetStateAction<number | null>>;
}

const RequestFormOne = React.forwardRef<
  React.ElementRef<"div">,
  HTMLAttributes<HTMLDivElement> & FormOneI
>(
  (
    {
      className,
      setTitle,
      category,
      setCategory,
      categoryType,
      setCategoryType,
      state,
      setState,
      city,
      setCity,
      ...props
    },
    fowardref
  ) => {
    const [stateCities, setStateCities] = React.useState<{
      [id: string]: CityInterface[];
    } | null>(null);
    const states = stateCities ? Object.keys(stateCities) : null;
    const cities = stateCities && state ? stateCities[state] : null;
    const [categories, setCategories] = React.useState<{
      [id: string]: CategoryType[];
    } | null>(null);

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

    const categoryKeys = categories ? Object.keys(categories) : null;

    React.useEffect(() => {
      const categoriesIntermediate = window.localStorage.getItem("categories");
      if (!categoriesIntermediate) {
        (async () => {
          try {
            const categoriesRes = await getCategories();
            setCategories(categoriesRes);
            window.localStorage.setItem(
              "categories",
              JSON.stringify(categoriesRes)
            );
          } catch (err) {
            console.log(err);
          }
        })();
      } else {
        setCategories(JSON.parse(categoriesIntermediate));
      }
    }, []);

    return (
      <div
        className={cn("h-full w-full", className)}
        ref={fowardref}
        {...props}
      >
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
              onChange={(e) => setTitle(e.target.value)}
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
                <Select onValueChange={(e) => setCategory(e)}>
                  <SelectTrigger
                    className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                    aria-label="Category"
                    icon={
                      <React.Suspense
                        fallback={
                          <div className="h-3 w-[7px] bg-stroke/60"></div>
                        }
                      >
                        <KeyboardArrowDownIcon className="text-[#828080]" />
                      </React.Suspense>
                    }
                  >
                    <SelectValue placeholder="Choose" className="" />
                  </SelectTrigger>

                  <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                    <SelectGroup>
                      <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3">
                        Category
                      </SelectLabel>

                      {categoryKeys?.map((category, index) => {
                        return (
                          <SelectItem
                            value={category}
                            className="hover:cursor-pointer font-body text-title_2 pl-2"
                            key={index}
                          >
                            {category}
                          </SelectItem>
                        );
                      })}
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
                <Select onValueChange={(e) => setCategoryType(Number(e))}>
                  <SelectTrigger
                    className={cn(
                      "flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                    )}
                    aria-label="Sub Category"
                    icon={
                      <React.Suspense
                        fallback={
                          <div className="h-3 w-[7px] bg-stroke/60"></div>
                        }
                      >
                        <KeyboardArrowDownIcon className="text-[#828080]" />
                      </React.Suspense>
                    }
                  >
                    <SelectValue placeholder="Select type" className="" />
                  </SelectTrigger>

                  <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                    <SelectGroup>
                      <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3">
                        Type
                      </SelectLabel>
                      {category &&
                        categories &&
                        categories[category]?.map((item, index) => {
                          return (
                            <SelectItem
                              value={item.id.toString()}
                              className="hover:cursor-pointer font-body text-title_2 pl-2"
                              key={index}
                            >
                              {item.name}
                            </SelectItem>
                          );
                        })}
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
                <Select onValueChange={(e) => setState(e)}>
                  <SelectTrigger
                    className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                    aria-label="state"
                    icon={
                      <React.Suspense
                        fallback={
                          <div className="h-3 w-[7px] bg-stroke/60"></div>
                        }
                      >
                        <KeyboardArrowDownIcon className="text-[#828080]" />
                      </React.Suspense>
                    }
                  >
                    <SelectValue placeholder="Select state" className="" />
                  </SelectTrigger>

                  <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                    <SelectGroup>
                      <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3">
                        State
                      </SelectLabel>
                      {states?.map((item, index) => {
                        return (
                          <SelectItem
                            value={item}
                            className="hover:cursor-pointer font-body text-title_2 pl-2"
                            key={index}
                          >
                            {item}
                          </SelectItem>
                        );
                      })}
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
                <Select onValueChange={(e) => setCity(Number(e))}>
                  <SelectTrigger
                    className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 data-[placeholder]:bg-faded data-[placeholder]:font-inter data-[placeholder]:text-[14px] data-[placeholder]:text-[#000000]/60"
                    aria-label="Category"
                    icon={
                      <React.Suspense
                        fallback={
                          <div className="h-3 w-[7px] bg-stroke/60"></div>
                        }
                      >
                        <KeyboardArrowDownIcon className="text-[#828080]" />
                      </React.Suspense>
                    }
                  >
                    <SelectValue placeholder="Select city" className="" />
                  </SelectTrigger>

                  <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-40">
                    <SelectGroup>
                      <SelectLabel className="text-[#000000]/60 opacity-60 font-body text-body_1 mb-3">
                        City
                      </SelectLabel>
                      {state &&
                        cities &&
                        cities.map((city, index) => {
                          return (
                            <SelectItem
                              value={city.id.toString()}
                              className="hover:cursor-pointer font-body text-title_2 pl-2"
                              key={city.id}
                            >
                              {city.city}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormPrimitive.Control>
            </FormPrimitive.Field>
          </div>
        </div>
      </div>
    );
  }
);

RequestFormOne.displayName = "RequestFormOne";

export default RequestFormOne;
