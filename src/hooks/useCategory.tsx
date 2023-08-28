import { getCategories } from "@/app/lib/category";
import { CategoryType } from "@/app/types";
import React from "react";

export default function useCategory() {
  const [categories, setCategories] = React.useState<{
    [category: string]: CategoryType[];
  } | null>(null);

  const [flattenedCategories, setFlattenedCategories] = React.useState<
    CategoryType[] | null
  >(null);

  React.useEffect(() => {
    const fecthCategories = async () => {
      const categoriesTemp = window.localStorage.getItem("categories");
      const categoriesValuesTemp = window.localStorage.getItem(
        "categoriesFlattened"
      );

      if (!categoriesTemp) {
        const res = await getCategories();
        if (res.isError) return;

        setCategories(res);
        window.localStorage.setItem("categories", JSON.stringify(res));

        let categoriesValues: CategoryType[] = [];
        Object.values(
          res as {
            [category: string]: CategoryType[];
          }
        ).map((categoryValue) => {
          categoriesValues = [...categoriesValues, ...categoryValue];
        });
        window.localStorage.setItem(
          "categoriesFlattened",
          JSON.stringify(categoriesValues)
        );
      } else {
        setCategories(JSON.parse(categoriesTemp));
      }
    };
    fecthCategories();
  }, []);

  React.useEffect(() => {
    const categoriesValuesTemp = window.localStorage.getItem(
      "categoriesFlattened"
    );

    if (categoriesValuesTemp) {
      setFlattenedCategories(JSON.parse(categoriesValuesTemp));
    } else {
      let categoriesValues: CategoryType[] = [];
      categories &&
        Object.values(
          categories as {
            [category: string]: CategoryType[];
          }
        ).map((categoryValue) => {
          categoriesValues = [...categoriesValues, ...categoryValue];
        });
      window.localStorage.setItem(
        "categoriesFlattened",
        JSON.stringify(categoriesValues)
      );
      setFlattenedCategories(categoriesValues);
    }
  }, [categories]);

  return [categories, flattenedCategories] as const;
}
