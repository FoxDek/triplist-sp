import type { Trip } from "../entities/types";

export const trips: Trip[] = [
  {
    id: 1,
    country: "Russia",
    city: "Cheboksary",
    name: "Trip 1",
    startDate: new Date('2026-01-16T10:00:00'),
    endDate: new Date('2026-01-20T18:00:00'),
    itemIds: [],
    taskIds: [],
  },
  {
    id: 2,
    country: "Russia",
    city: "Cheboksary",
    name: "Trip 2",
    startDate: new Date('2026-01-16T10:00:00'),
    endDate: new Date('2026-01-20T18:00:00'),
    itemIds: [],
    taskIds: [],
  },
  {
    id: 3,
    country: "Russia",
    city: "Cheboksary",
    name: "Trip 3",
    startDate: new Date('2026-01-16T10:00:00'),
    endDate: new Date('2026-01-20T18:00:00'),
    itemIds: [],
    taskIds: [],
  },
];

export const baggageDefaultItems = [
  { id: 1, title: 'Passport', icon: 'IdCard' },
  { id: 2, title: 'Tickets', icon: 'Ticket' },
  { id: 3, title: 'Insurance', icon: 'ShieldCheck' },
  { id: 4, title: 'Visa', icon: 'Stamp' },
  { id: 5, title: 'Driver license', icon: 'Car' },

  // Деньги
  { id: 6, title: 'Cash', icon: 'Banknote' },
  { id: 7, title: 'Credit card', icon: 'CreditCard' },
  { id: 8, title: 'Wallet', icon: 'Wallet' },

  { id: 9, title: 'Phone', icon: 'Smartphone' },
  { id: 10, title: 'Charger', icon: 'Plug' },
  { id: 11, title: 'Power bank', icon: 'BatteryCharging' },
  { id: 12, title: 'Headphones', icon: 'Headphones' },
  { id: 13, title: 'Laptop', icon: 'Laptop' },
  { id: 14, title: 'Camera', icon: 'Camera' },

  { id: 15, title: 'T-shirts', icon: 'Shirt' },
  { id: 16, title: 'Pants', icon: 'User' },
  { id: 17, title: 'Underwear', icon: 'Layers' },
  { id: 18, title: 'Jacket', icon: 'Wind' },
  { id: 19, title: 'Sleepwear', icon: 'Moon' },
  { id: 20, title: 'Shoes', icon: 'Footprints' },

  { id: 21, title: 'Toothbrush', icon: 'Smile' },
  { id: 22, title: 'Toothpaste', icon: 'SoapDispenserDroplet' },
  { id: 23, title: 'Shampoo', icon: 'SoapDispenserDroplet' },
  { id: 24, title: 'Deodorant', icon: 'SprayCan' },
  { id: 25, title: 'Towel', icon: 'Bath' },

  { id: 26, title: 'Medicines', icon: 'Pill' },

  { id: 27, title: 'Backpack', icon: 'Backpack' },
  { id: 28, title: 'Sunglasses', icon: 'Glasses' },
  { id: 29, title: 'Umbrella', icon: 'Umbrella' },
  { id: 30, title: 'Water', icon: 'GlassWater' },
  { id: 31, title: 'Notebook', icon: 'Notebook' },
  { id: 32, title: 'Pen', icon: 'Pen' },
]