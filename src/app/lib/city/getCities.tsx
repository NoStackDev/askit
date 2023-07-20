type CityType = {
  id: number;
  city: string;
  state: string;
};

const getCities = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cities`, {
    method: "OPTIONS",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status === 200) {
    const cities: { data: CityType[] } = await res.json();
    const stateCityObj: Record<string, CityType[]> = {};
    cities.data.forEach((city) => {
      if (!stateCityObj[city.state]) {
        stateCityObj[city.state] = [city];
      } else {
        stateCityObj[city.state] = [...stateCityObj[city.state], city];
      }
    });
    return stateCityObj;
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
};

export default getCities;
