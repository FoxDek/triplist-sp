import * as Icons from "lucide-react";

export type Trip = {
  id: number,
  country: string,
  purpose?: string,
  city?: string,
  name?: string,
  startDate?: Date,
  endDate?: Date,
  itemIds: string[],
  taskIds: string[],
}

export type TripTask = {
  id: number,
  tripId: number,
  text: string,
  completed: boolean,
}

export type TripItem = {
  id: number,
  tripId: number,
  text: string,
  isTaken: boolean,
}

export type TripFormData = {
  name: string;
  purpose: string;
  country: string;
  city: string;
  startDate: string | number | readonly string[] | undefined;
  endDate: string | number | readonly string[] | undefined;
}

export type BaggageItem = {
  id: number;
  title: string;
  icon?: keyof typeof Icons;
  isCustom?: boolean;
};