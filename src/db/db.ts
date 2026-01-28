import Dexie, { type Table } from "dexie";
import type { Trip, TripItem, TripTask } from "./schema";


export class AppDB extends Dexie {
  trips!: Table<Trip, number>;
  tripItems!: Table<TripItem, number>;
  tripTasks!: Table<TripTask, number>;

  constructor() {
    super('TripPlannerDB');

    this.version(1).stores({
      trips: '++id, name, purpose, country, city, startDate, endDate',
      tripItems: '++id, tripId, text, isTaken',
      tripTasks: '++id, tripId, text, completed'
    });
  }
}

export const db = new AppDB();

