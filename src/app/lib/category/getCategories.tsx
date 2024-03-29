type CategoryType = {
  id: number;
  name: string;
  category: string;
};

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categoryGroups`, {
    method: "OPTIONS",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status >= 200 && res.status <= 299) {
    const categories: { data: CategoryType[] } = await res.json();
    const categoriesSubCategories: Record<string, CategoryType[]> = {};
    categories.data.forEach((subCategory) => {
      if (!categoriesSubCategories[subCategory.category]) {
        categoriesSubCategories[subCategory.category] = [subCategory];
      } else {
        categoriesSubCategories[subCategory.category] = [
          ...categoriesSubCategories[subCategory.category],
          subCategory,
        ];
      }
    });
    return categoriesSubCategories;
  }

  if (res.status < 200 || res.status > 299) {
    const json = await res.json();
    console.log(json);
    return { isError: true, ...json };
  }
  return res.json();
};

export default getCategories;
