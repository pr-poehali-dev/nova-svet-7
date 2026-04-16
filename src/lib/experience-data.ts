export interface Experience {
  id: string
  title: string
  company: string
  location: {
    city: string
    country: string
    lat: number
    lng: number
    isRemote: boolean
  }
  startDate: string
  endDate: string
  color: "pink" | "yellow" | "green" | "blue"
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Скупка золота и украшений",
    company: "Золотой Век — центральный офис",
    location: {
      city: "Москва",
      country: "Россия",
      lat: 55.7558,
      lng: 37.6173,
      isRemote: false,
    },
    startDate: "2010-01-01",
    endDate: "2025-12-31",
    color: "yellow",
  },
  {
    id: "2",
    title: "Скупка золота и украшений",
    company: "Золотой Век — Санкт-Петербург",
    location: {
      city: "Санкт-Петербург",
      country: "Россия",
      lat: 59.9311,
      lng: 30.3609,
      isRemote: false,
    },
    startDate: "2012-03-01",
    endDate: "2025-12-31",
    color: "yellow",
  },
  {
    id: "3",
    title: "Скупка золота и украшений",
    company: "Золотой Век — Екатеринбург",
    location: {
      city: "Екатеринбург",
      country: "Россия",
      lat: 56.8389,
      lng: 60.6057,
      isRemote: false,
    },
    startDate: "2015-06-01",
    endDate: "2025-12-31",
    color: "pink",
  },
  {
    id: "4",
    title: "Скупка золота и украшений",
    company: "Золотой Век — Краснодар",
    location: {
      city: "Краснодар",
      country: "Россия",
      lat: 45.0355,
      lng: 38.9753,
      isRemote: false,
    },
    startDate: "2017-09-01",
    endDate: "2025-12-31",
    color: "pink",
  },
  {
    id: "5",
    title: "Скупка золота и украшений",
    company: "Золотой Век — Новосибирск",
    location: {
      city: "Новосибирск",
      country: "Россия",
      lat: 54.9885,
      lng: 82.9207,
      isRemote: false,
    },
    startDate: "2019-02-01",
    endDate: "2025-12-31",
    color: "yellow",
  },
]
