import { getPreferences } from "@/app/lib/user";
import { UserPreferencesType } from "@/app/types";
import React from "react";

export default function usePreferences() {
  const [preferences, setPreferences] = React.useState<
    UserPreferencesType | null | undefined
  >(undefined);

  React.useEffect(() => {
    const userDetails = window.localStorage.getItem("userDetails");
    const token = window.localStorage.getItem("token");
    const userPreferences = window.localStorage.getItem("userPreferences");

    const fecthPreferences = async () => {
      if (token && userDetails) {
        const res = await getPreferences(
          token,
          JSON.parse(userDetails).data.id
        );
        if (res.isError) return;

        setPreferences(res);
        window.localStorage.setItem("userPreferences", JSON.stringify(res));
      }
    };

    if (token && userDetails) {
      if (userPreferences) {
        setPreferences(JSON.parse(userPreferences));
        fecthPreferences();
      } else fecthPreferences();
    } else {
      setPreferences(null);
    }
  }, []);

  return { preferences } as const;
}
