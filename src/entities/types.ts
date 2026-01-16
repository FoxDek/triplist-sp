export type Trip = {
  id: number,
  country: string,
  city: string,
  name: string,
  startDate: Date,
  endDate: Date,
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