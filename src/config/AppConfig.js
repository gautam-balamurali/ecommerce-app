import { v4 as uuid } from "uuid";

export const priceFieldFilters = [
  {
    label: "Price: Low to High",
    value: "ascending",
    type: "radio",
    name: "radioButtonValue",
  },
  {
    label: "Price: High to Low",
    value: "descending",
    type: "radio",
    name: "radioButtonValue",
  },
];

export const collections = [
  {
    _id: uuid(),
    collectionName: "men",
    imageUrl:
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685866682/cricify/team-bg1_cn2jeo.jpg",
  },
  {
    _id: uuid(),
    collectionName: "women",
    imageUrl:
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796128/cricify/women%27s-international/team-bg2_vzglms.jpg",
  },
];

export const leagueTypeFieldFilters = [
  {
    label: "IPL",
    value: "ipl",
  },
  {
    label: "WPL",
    value: "wpl",
  },
  {
    label: "International",
    value: "international",
  },
];
