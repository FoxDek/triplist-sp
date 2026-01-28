import type { TripItem } from "../db/schema";

export const baggageDefaultItems: Omit<TripItem, 'tripId'>[] = [
  { title: 'Passport', icon: 'IdCard', isTaken: false },
  { title: 'Tickets', icon: 'Ticket', isTaken: false },
  { title: 'Insurance', icon: 'ShieldCheck', isTaken: false },
  { title: 'Visa', icon: 'Stamp', isTaken: false },
  { title: 'Driver license', icon: 'Car', isTaken: false },

  // Деньги
  { title: 'Cash', icon: 'Banknote', isTaken: false },
  { title: 'Credit card', icon: 'CreditCard', isTaken: false },
  { title: 'Wallet', icon: 'Wallet', isTaken: false },

  { title: 'Phone', icon: 'Smartphone', isTaken: false },
  {  title: 'Charger', icon: 'Plug', isTaken: false },
  {  title: 'Power bank', icon: 'BatteryCharging', isTaken: false },
  {  title: 'Headphones', icon: 'Headphones', isTaken: false },
  {  title: 'Laptop', icon: 'Laptop', isTaken: false },
  {  title: 'Camera', icon: 'Camera', isTaken: false },

  {  title: 'T-shirts', icon: 'Shirt', isTaken: false },
  {  title: 'Pants', icon: 'User', isTaken: false },
  {  title: 'Underwear', icon: 'Layers', isTaken: false },
  {  title: 'Jacket', icon: 'Wind', isTaken: false },
  {  title: 'Sleepwear', icon: 'Moon', isTaken: false },
  {  title: 'Shoes', icon: 'Footprints', isTaken: false },

  {  title: 'Toothbrush', icon: 'Smile', isTaken: false },
  {  title: 'Toothpaste', icon: 'SoapDispenserDroplet', isTaken: false },
  {  title: 'Shampoo', icon: 'SoapDispenserDroplet', isTaken: false },
  {  title: 'Deodorant', icon: 'SprayCan', isTaken: false },
  {  title: 'Towel', icon: 'Bath', isTaken: false },

  {  title: 'Medicines', icon: 'Pill', isTaken: false },

  {  title: 'Backpack', icon: 'Backpack', isTaken: false },
  {  title: 'Sunglasses', icon: 'Glasses', isTaken: false },
  {  title: 'Umbrella', icon: 'Umbrella', isTaken: false },
  {  title: 'Water', icon: 'GlassWater', isTaken: false },
  {  title: 'Notebook', icon: 'Notebook', isTaken: false },
  {  title: 'Pen', icon: 'Pen', isTaken: false },
]

export const defaultTasks = ['turn off the water', 'turn off the lights', 'close the house', 'turn off the water', 'turn off the lights', 'close the house']