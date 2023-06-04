import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "jerseys",
    description: "Cricket jerseys for various teams and players.",
    images: [
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796114/cricify/misc/IPL-Merchandise-IPL-Jersey-Caps_bogsfv.jpg",
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796114/cricify/misc/india_new_jersey_cover-1457965836-800_qelrwe.jpg",
    ],
  },
  {
    _id: uuid(),
    categoryName: "gears",
    description: "Cricket gears and equipment for players.",
    images: [
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796114/cricify/misc/cricket-gear-on-grass-260nw-374964424_gbmltp.jpg",
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796114/cricify/misc/cricket-equipments_lx4tqy.jpg",
    ],
  },
  {
    _id: uuid(),
    categoryName: "merchandise",
    description: "Official merchandise and accessories related to cricket.",
    images: [
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685884374/cricify/misc/mi-flip-flops-merchandise_sojpgh.jpg",
      "https://res.cloudinary.com/dbe8yf165/image/upload/v1685890077/cricify/misc/IPL_Merchandise_Partners_qot6wc.jpg",
    ],
  },
];
