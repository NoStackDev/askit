import { getCities } from "@/app/lib/city";
import { CityInterface, StateCitiesInterface } from "@/app/types";
import React from "react";

export default function useLocations() {
  const [locations, setLocations] = React.useState<StateCitiesInterface | null>(
    null
  );

  const [flattenedLocations, setFlattenedLocations] = React.useState<
    CityInterface[] | null
  >(null);

  React.useEffect(() => {
    const fecthLocations = async () => {
      const locationsTemp = window.localStorage.getItem("locations");

      if (!locationsTemp) {
        const res = await getCities();
        if (res.isError) return;

        setLocations(res);
        window.localStorage.setItem("locations", JSON.stringify(res));

        let locationsValues: CityInterface[] = [];
        Object.values(
          res as {
            [state: string]: CityInterface[];
          }
        ).map((locationValue) => {
          locationsValues = [...locationsValues, ...locationValue];
        });
        window.localStorage.setItem(
          "locationsFlattened",
          JSON.stringify(locationsValues)
        );
      } else {
        setLocations(JSON.parse(locationsTemp));
      }
    };
    fecthLocations();
  }, []);

  React.useEffect(() => {
    const locationsValuesTemp =
      window.localStorage.getItem("locationsFlattened");

    if (locationsValuesTemp) {
      setFlattenedLocations(JSON.parse(locationsValuesTemp));
    } else {
      let locationsValues: CityInterface[] = [];
      locations &&
        Object.values(
          locations as {
            [state: string]: CityInterface[];
          }
        ).map((locationValue) => {
          locationsValues = [...locationsValues, ...locationValue];
        });
      window.localStorage.setItem(
        "locationsFlattened",
        JSON.stringify(locationsValues)
      );
      setFlattenedLocations(locationsValues);
    }
  }, [locations]);

  return [locations, flattenedLocations] as const;
}
