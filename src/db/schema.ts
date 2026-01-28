import * as Icons from "lucide-react";

export interface Trip {
  id? : number,
  country: string,
  purpose?: string,
  city?: string,
  name?: string,
  startDate?: Date,
  endDate?: Date,
}

export interface TripItem {
  id?: number,
  tripId: number,
  title: string,
  isTaken: boolean,
  icon?: keyof typeof Icons
}

export interface TripTask {
  id?: number,
  tripId: number,
  text: string,
  completed: boolean,
}



export type TripFormData = {
  name: string;
  purpose: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
}
