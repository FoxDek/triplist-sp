import type { Trip } from "../entities/types";

export default function TripItem({trip}: {trip: Trip}) {

  function dateAdaptation(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return {
      day,
      month,
      year
    }
  } 

  const startDate = dateAdaptation(trip.startDate);
  const endDate = dateAdaptation(trip.endDate);

  return (
    <div className="tripItem bg-accent py-2 px-4 rounded-2xl flex flex-col gap-1">
      <div className="tripItemTop flex justify-between">
        <p className="tripCountry text-2xl font-bold text-white ">{trip.country}</p>
        <div className="flex">
          
        </div>
      </div>

      <div className="tripItemBottom flex border-2 border-white/80 w-fit px-2 py-1 rounded-2xl gap-2">
        <p className="tripDate text-xs font-semibold text-white/80">{startDate.day + " " + startDate.month + " "} {startDate.year === endDate.year ? "" : startDate.year}</p>
        <span className="tripDate text-xs font-semibold text-white/80">-</span>
        <p className="tripDate text-xs font-semibold text-white/80">{endDate.day + " " + endDate.month + " " + endDate.year}</p>
      </div>

    </div>
  )
}
