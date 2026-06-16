export type Location = {
  id: string;
  name: string;
  code?: string;
  city: string;
  state?: string;
  country: string;
  type: "airport" | "station" | "city";
};

export const INDIA_AIRPORTS: Location[] = [
  {
    id: "DEL",
    name: "Indira Gandhi International Airport",
    code: "DEL",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    type: "airport",
  },
  {
    id: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    code: "BOM",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    type: "airport",
  },
  {
    id: "BLR",
    name: "Kempegowda International Airport",
    code: "BLR",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    type: "airport",
  },
  {
    id: "HYD",
    name: "Rajiv Gandhi International Airport",
    code: "HYD",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    type: "airport",
  },
  {
    id: "MAA",
    name: "Chennai International Airport",
    code: "MAA",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    type: "airport",
  },
  {
    id: "CCU",
    name: "Netaji Subhash Chandra Bose International Airport",
    code: "CCU",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    type: "airport",
  },
  {
    id: "AMD",
    name: "Sardar Vallabhbhai Patel International Airport",
    code: "AMD",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    type: "airport",
  },
  {
    id: "PNQ",
    name: "Pune Airport",
    code: "PNQ",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    type: "airport",
  },
  {
    id: "COK",
    name: "Cochin International Airport",
    code: "COK",
    city: "Kochi",
    state: "Kerala",
    country: "India",
    type: "airport",
  },
  {
    id: "GOX",
    name: "Manohar International Airport",
    code: "GOX",
    city: "Goa",
    state: "Goa",
    country: "India",
    type: "airport",
  },
];

export const INDIA_STATIONS: Location[] = [
  {
    id: "NDLS",
    name: "New Delhi Railway Station",
    code: "NDLS",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    type: "station",
  },
  {
    id: "MMCT",
    name: "Mumbai Central Railway Station",
    code: "MMCT",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    type: "station",
  },
  {
    id: "HWH",
    name: "Howrah Junction",
    code: "HWH",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    type: "station",
  },
  {
    id: "MAS",
    name: "MGR Chennai Central",
    code: "MAS",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    type: "station",
  },
  {
    id: "SBC",
    name: "KSR Bengaluru City Junction",
    code: "SBC",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    type: "station",
  },
  {
    id: "SC",
    name: "Secunderabad Junction",
    code: "SC",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    type: "station",
  },
  {
    id: "ADI",
    name: "Ahmedabad Junction",
    code: "ADI",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    type: "station",
  },
  {
    id: "PUNE",
    name: "Pune Junction",
    code: "PUNE",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    type: "station",
  },
];

export const INDIA_CITIES: Location[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    type: "city",
  },
  { id: "delhi", name: "Delhi", city: "Delhi", state: "Delhi", country: "India", type: "city" },
  {
    id: "bangalore",
    name: "Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    type: "city",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    type: "city",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    type: "city",
  },
  {
    id: "chennai",
    name: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    type: "city",
  },
  {
    id: "kolkata",
    name: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    type: "city",
  },
  { id: "pune", name: "Pune", city: "Pune", state: "Maharashtra", country: "India", type: "city" },
  {
    id: "jaipur",
    name: "Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    type: "city",
  },
  {
    id: "lucknow",
    name: "Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    type: "city",
  },
];

export type CountryData = {
  id: string;
  name: string;
  airports: Location[];
  stations: Location[];
  cities: Location[];
};

export const INTERNATIONAL_DATA: CountryData[] = [
  {
    id: "USA",
    name: "USA",
    airports: [
      {
        id: "JFK",
        name: "John F. Kennedy International Airport",
        code: "JFK",
        city: "New York",
        country: "USA",
        type: "airport",
      },
      {
        id: "LAX",
        name: "Los Angeles International Airport",
        code: "LAX",
        city: "Los Angeles",
        country: "USA",
        type: "airport",
      },
    ],
    stations: [
      {
        id: "PENN",
        name: "Penn Station",
        code: "PENN",
        city: "New York",
        country: "USA",
        type: "station",
      },
    ],
    cities: [
      { id: "nyc", name: "New York", city: "New York", country: "USA", type: "city" },
      { id: "lax", name: "Los Angeles", city: "Los Angeles", country: "USA", type: "city" },
    ],
  },
  {
    id: "GBR",
    name: "United Kingdom",
    airports: [
      {
        id: "LHR",
        name: "London Heathrow Airport",
        code: "LHR",
        city: "London",
        country: "United Kingdom",
        type: "airport",
      },
    ],
    stations: [
      {
        id: "KGX",
        name: "King's Cross Station",
        code: "KGX",
        city: "London",
        country: "United Kingdom",
        type: "station",
      },
    ],
    cities: [
      { id: "london", name: "London", city: "London", country: "United Kingdom", type: "city" },
    ],
  },
  {
    id: "FRA",
    name: "France",
    airports: [
      {
        id: "CDG",
        name: "Charles de Gaulle Airport",
        code: "CDG",
        city: "Paris",
        country: "France",
        type: "airport",
      },
    ],
    stations: [
      {
        id: "GDU",
        name: "Gare du Nord",
        code: "GDU",
        city: "Paris",
        country: "France",
        type: "station",
      },
    ],
    cities: [{ id: "paris", name: "Paris", city: "Paris", country: "France", type: "city" }],
  },
  {
    id: "JPN",
    name: "Japan",
    airports: [
      {
        id: "NRT",
        name: "Narita International Airport",
        code: "NRT",
        city: "Tokyo",
        country: "Japan",
        type: "airport",
      },
    ],
    stations: [
      {
        id: "TKO",
        name: "Tokyo Station",
        code: "TKO",
        city: "Tokyo",
        country: "Japan",
        type: "station",
      },
    ],
    cities: [{ id: "tokyo", name: "Tokyo", city: "Tokyo", country: "Japan", type: "city" }],
  },
  {
    id: "ARE",
    name: "UAE",
    airports: [
      {
        id: "DXB",
        name: "Dubai International Airport",
        code: "DXB",
        city: "Dubai",
        country: "UAE",
        type: "airport",
      },
    ],
    stations: [],
    cities: [{ id: "dubai", name: "Dubai", city: "Dubai", country: "UAE", type: "city" }],
  },
];
