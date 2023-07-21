export type GeoapifyResponse = {
  city: {
    names: Record<string, string>;
    name: string;
  };
  continent: {
    code: string;
    geoname_id: number;
    names: Record<string, string>;
    name: string;
  };
  country: {
    geoname_id: number;
    iso_code: string;
    names: {
      de: string;
      en: string;
      es: string;
      fa: string;
      fr: string;
      ja: string;
      ko: string;
      "pt-BR": string;
      ru: string;
      "zh-CN": string;
    };
    name: string;
    name_native: string;
    phone_code: string;
    capital: string;
    currency: string;
    flag: string;
    languages: Language[];
  };
  location: {
    latitude: number;
    longitude: number;
  };
  subdivisions: {
    names: {
      en: string;
    };
  }[];
  state: {
    name: string;
  };
  datasource: {
    name: string;
    attribution: string;
    license: string;
  }[];
  ip: string;
};

export type Language = {
  iso_code: string;
  name: string;
  name_native: string;
};
