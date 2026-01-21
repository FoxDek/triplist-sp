export type Country = {
  name: string;
  cca2: string;
}

type RestCountry = {
  name: {
    common: string;
  };
  cca2: string;
}

export async function getCountries(): Promise<Country[]> {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');

  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }

  const data = await res.json();

  return data.map((country: RestCountry) => ({
    name: country.name.common,
    cca2: country.cca2
  }));
}