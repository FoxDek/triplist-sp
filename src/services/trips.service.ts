import { db } from "../db/db";
import type { Trip } from "../db/schema";


export const tripsService = {
  getAll: () => db.trips.toArray(),

  getById: (id: number) =>
    db.trips.get(id),

  create: (trip: Trip) =>
    db.trips.add(trip),

  update: (id: number, data: Partial<Trip>) => 
    db.trips.update(id, data),

  delete: (id: number) =>
    db.trips.delete(id),
}