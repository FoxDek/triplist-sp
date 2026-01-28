import type { Trip, TripFormData } from "../db/schema";

export const tripToForm = (trip: Trip): TripFormData => ({
  name: trip.name ?? '',
  purpose: trip.purpose ?? '',
  country: trip.country ?? '',
  city: trip.city ?? '',
  startDate: trip.startDate?.toISOString().slice(0, 10) ?? '',
  endDate: trip.endDate?.toISOString().slice(0, 10) ?? '',
});

export const formToTrip = (form: TripFormData): Partial<Trip> => ({
  name: form.name,
  purpose: form.purpose,
  country: form.country,
  city: form.city,
  startDate: form.startDate ? new Date(form.startDate) : undefined,
  endDate: form.endDate ? new Date(form.endDate) : undefined,
});
