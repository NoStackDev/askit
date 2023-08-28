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
import LocationSelector from "../LocationSelector";
import Dialog from "../ui/DialogPrimitive";
const KeyboardArrowDownIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardArrowDown")
);

interface FormOneI {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  categoryType: number | null;
  setCategoryType: React.Dispatch<React.SetStateAction<number | null>>;
  state: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  city: number | null;
  setCity: React.Dispatch<React.SetStateAction<number | null>>;
  formErrors: {
    title: { errors: string[]; showErrors: boolean };
    category: { errors: string[]; showErrors: boolean };
    location: { errors: string[]; showErrors: boolean };
  };
  setFormErrors: React.Dispatch<
    React.SetStateAction<{
      title: { errors: string[]; showErrors: boolean };
      category: { errors: string[]; showErrors: boolean };
      location: { errors: string[]; showErrors: boolean };
    }>
  >;
}

const RequestFormOne = React.forwardRef<
  React.ElementRef<"div">,
  HTMLAttributes<HTMLDivElement> & FormOneI
>(
  (
    {
      className,
      title,
      setTitle,
      category,
      setCategory,
      categoryType,
      setCategoryType,
      state,
      setState,
      city,
      setCity,
      formErrors,
      setFormErrors,
      ...props
    },
    fowardref
  ) => {
    const [stateCities, setStateCities] = React.useState<{
      [id: string]: CityInterface[];
    } | null>(null);
    const [categories, setCategories] = React.useState<{
      [id: string]: CategoryType[];
    } | null>(null);
    const [citiesFlattened, setCitiesFlattened] = React.useState<
      CityInterface[] | null
    >(null);

    const [openLocationModal, setOpenLocationModal] = React.useState(false);

    React.useEffect(() => {
      const stateCitiesIntermediate = window.localStorage.getItem("cities");
      const citiesFlattenedTemp =
        window.localStorage.getItem("citiesFlattened");

      if (!stateCitiesIntermediate) {
        (async () => {
          try {
            let citiesValues: CityInterface[] = [];
            const citiesRes: StateCitiesInterface = await getCities();
            window.localStorage.setItem("cities", JSON.stringify(citiesRes));
            setStateCities(citiesRes);
            Object.values(citiesRes).map((stateCitiesArr) => {
              citiesValues = [...citiesValues, ...stateCitiesArr];
            });
            window.localStorage.setItem(
              "citiesFlattened",
              JSON.stringify(citiesValues)
            );
            setCitiesFlattened(citiesValues);
          } catch (err) {
            console.log(err);
          }
        })();
      } else {
        let citiesValues: CityInterface[] = [];
        setStateCities(JSON.parse(stateCitiesIntermediate));
        Object.values(
          JSON.parse(stateCitiesIntermediate) as StateCitiesInterface
        ).map((stateCitiesArr) => {
          citiesValues = [...citiesValues, ...stateCitiesArr];
        });
        setCitiesFlattened(citiesValues);
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
        className={cn("h-full w-full mb-8 md:mb-0", className)}
        ref={fowardref}
        {...props}
      >
        <h2 className="font-headline text-headline_3 font-bold text-[#000000] text-left">
          Tell us What You’re Looking For and Where!
        </h2>

        <FormPrimitive.Field
          name="request"
          className="mt-6 flex flex-col gap-2 w-full"
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-baseline">
              <FormPrimitive.Label className="font-medium font-body text-title_3 text-secondary/80">
                Title of your request
              </FormPrimitive.Label>
              <div className="font-body text-body_2 font-normal text-[#000000]/60">
                92 char max
              </div>
            </div>

            <div className="w-full flex-col items-start">
              {formErrors.title.showErrors &&
                formErrors.title.errors.map((errorMsg) => {
                  return (
                    <div
                      className="font-body text-body_3 text-[red]/80 self-end"
                      key={errorMsg}
                    >
                      {errorMsg}
                    </div>
                  );
                })}
            </div>
          </div>

          <FormPrimitive.Control asChild>
            <textarea
              placeholder="I am looking for..."
              className="p-6 rounded-lg border-[1px] border-stroke placeholder:font-body placeholder:text-body_1 min-h-20 bg-faded placeholder:text-[#000000]/60"
              required
              minLength={32}
              maxLength={92}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (formErrors.title.showErrors) {
                  setFormErrors({
                    ...formErrors,
                    title: { ...formErrors.title, showErrors: false },
                  });
                }
              }}
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>

        <div className="mt-8 ">
          <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-5 items-center">
            <FormPrimitive.Field
              name="category"
              className="flex flex-col gap-1 w-full"
            >
              <div className="flex">
                <FormPrimitive.Label className="font-medium font-body text-title_3 text-secondary/80">
                  Choose perfect category
                </FormPrimitive.Label>
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

                  <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-50">
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
              className="flex flex-col gap-1 w-full md:self-end"
            >
              <div className="flex items-baseline justify-between">
                <div className="w-full flex-col items-start">
                  {formErrors.category.showErrors &&
                    formErrors.category.errors.map((errorMsg) => {
                      return (
                        <div
                          className="font-body text-body_3 text-[red]/80 self-end"
                          key={errorMsg}
                        >
                          {errorMsg}
                        </div>
                      );
                    })}
                </div>
              </div>

              <FormPrimitive.Control asChild>
                <Select
                  onValueChange={(e) => {
                    setCategoryType(Number(e));
                    if (formErrors.category.showErrors) {
                      setFormErrors({
                        ...formErrors,
                        category: { ...formErrors.category, showErrors: false },
                      });
                    }
                  }}
                >
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

                  <SelectContent className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-50">
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
          <div className="mt-4 flex flex-col md:flex-row gap-4 md:gap-5 items-center">
            <FormPrimitive.Field
              name="state"
              className="mt-1 flex flex-col gap-1 w-full"
            >
              <div className="w-full flex justify-between items-center">
                <FormPrimitive.Label className="w-full font-medium font-body text-title_3 text-secondary/80">
                  Where will you want it?
                </FormPrimitive.Label>

                <div className="w-full flex-col items-end">
                  {formErrors.location.showErrors &&
                    formErrors.location.errors.map((errorMsg) => {
                      return (
                        <div
                          className="font-body text-body_3 text-[red]/80 self-end"
                          key={errorMsg}
                        >
                          {errorMsg}
                        </div>
                      );
                    })}
                </div>
              </div>

              <FormPrimitive.Control asChild>
                <Dialog
                  dialogTrigger={
                    <div className="flex justify-between w-full rounded-lg border border-[#D9D9D9] p-3 bg-faded font-inter hover:cursor-pointer">
                      <input
                        value={
                          (city &&
                            citiesFlattened &&
                            citiesFlattened[city - 1].city) ||
                          "Select a City"
                        }
                        className={cn(
                          "w-full bg-faded hover:cursor-pointer text-[#000000]/60 text-[14px]",
                          city && "font-body text-black text-[16px]"
                        )}
                      />
                    </div>
                  }
                  className="top-1/2 -translate-y-1/2 fixed left-1/2 -translate-x-1/2 z-[60]"
                  open={openLocationModal}
                  onOpenChange={setOpenLocationModal}
                >
                  <LocationSelector
                    setLocation={setCity}
                    setOpenLocationModal={setOpenLocationModal}
                  />
                </Dialog>
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
