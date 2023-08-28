"use client";

import { getCategories } from "@/app/lib/category";
import { CategoryType } from "@/app/types";
import useCategory from "@/hooks/useCategory";
import React from "react";

const ChevronRightIcon = React.lazy(
  () => import("@mui/icons-material/ChevronRight")
);
const ArrowBackIcon = React.lazy(() => import("@mui/icons-material/ArrowBack"));

const CategorySelector = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    setCategory: React.Dispatch<React.SetStateAction<number | null>>;
    setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
>(({ className, setCategory, setOpenCategoryModal, ...props }, fowardref) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [categories, flattenedCategories] = useCategory();

  const contentInfoRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white max-h-[500px] w-[80vw] max-w-[360px]">
      <div>
        <div className="px-4 pt-10 pb-4 border-b border-[#000000]/10 flex flex-col gap-8">
          <h3 className="font-headline text-headline_3 font-bold">
            Select Category
          </h3>
          {selectedCategory ? (
            <div
              className="flex gap-4 items-center hover:cursor-pointer"
              onClick={() => {
                setSelectedCategory(null);
                if (contentInfoRef.current) {
                  contentInfoRef.current.scrollTo(0, 0);
                }
              }}
            >
              <React.Suspense
                fallback={
                  <div className="w-4 h-4 bg-stroke/60 animate-pulse"></div>
                }
              >
                <ArrowBackIcon className="w-4 h-4" />
              </React.Suspense>

              <h4 className="font-body text-lg font-medium text-[#000000]/60">
                {selectedCategory}
              </h4>
            </div>
          ) : (
            <h4 className="font-body text-lg font-medium text-[#000000]/60">
              Categories
            </h4>
          )}
        </div>
        <div
          className="p-4 flex flex-col gap-4 div max-h-[268px] overflow-auto"
          ref={contentInfoRef}
        >
          {selectedCategory && categories
            ? categories[selectedCategory]?.map((category) => {
                return (
                  <div
                    className="hover:bg-stroke/20 hover:cursor-pointer"
                    key={category.id}
                    onClick={() => {
                      setCategory(category.id);
                      setOpenCategoryModal(false);
                    }}
                  >
                    {category.name}
                  </div>
                );
              })
            : categories &&
              Object.keys(categories)?.map((category, index) => {
                return (
                  <div
                    className="hover:bg-stroke/20 hover:cursor-pointer flex items-center justify-between"
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      if (contentInfoRef.current) {
                        contentInfoRef.current.scrollTo(0, 0);
                      }
                    }}
                  >
                    {category}

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
  );
});

CategorySelector.displayName = "CategorySelector";

export default CategorySelector;
