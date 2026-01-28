import { db } from "../db/db";
import type { TripItem } from "../db/schema";


export const tripItemsService = {
  getAll: () =>
    db.tripItems.toArray(),

  getAllByTripId: (tripId: number) =>
    db.tripItems.where('tripId').equals(tripId).toArray(),

  create: (item: TripItem) =>
    db.tripItems.add(item),

  createMany: (items: Omit<TripItem, 'tripId'>[], tripId: number) => 
    db.tripItems.bulkAdd(items.map(item => ({ ...item, tripId }))),

  update: (id: number, data: Partial<TripItem>) => 
    db.tripItems.update(id, data),

  delete: (id: number) => 
    db.tripItems.delete(id),
}