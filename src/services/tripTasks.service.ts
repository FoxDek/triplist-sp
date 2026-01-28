import { db } from "../db/db";
import type { TripTask } from "../db/schema";


export const tripTasksService = {
  getAll: () =>
    db.tripTasks.toArray(),

  getAllByTripId: (tripId: number) =>
    db.tripTasks.where('tripId').equals(tripId).toArray(),

  create: (task: TripTask) =>
    db.tripTasks.add(task),

  update: (id: number, data: Partial<TripTask>) => 
    db.tripTasks.update(id, data),

  delete: (id: number) => 
    db.tripTasks.delete(id),
}