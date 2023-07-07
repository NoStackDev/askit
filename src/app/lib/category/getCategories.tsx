type CategoryType = {
  id: number;
  name: string;
  category: string;
};

const getCategories = async (token: string) => {
  const res = await fetch(`${process.env.API}/categoryGroups`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status === 200) {
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

  return res.json();
};

export default getCategories;
