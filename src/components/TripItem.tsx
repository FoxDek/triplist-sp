import { cva } from "class-variance-authority";
import { Ellipsis, EllipsisVertical, Luggage, SquareCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Trip } from "../db/schema";
import { dateAdaptation } from "../utils/dateFormat.utils";
import { tripItemsService } from '../services/tripItems.service';
import { useLiveQuery } from "dexie-react-hooks";
import { tripTasksService } from "../services/tripTasks.service";


const tripItem = cva("tripItem bg-accent py-4 px-6 rounded-2xl flex flex-col md:flex-row justify-between hover:scale-101 transition ease-in-out gap-5 hover:shadow-md hover:shadow-accent/30");
const tripItemLeft = cva("TripItemLeft flex justify-between flex-col gap-4 md:gap-2");
const tripTarget = cva("tripTarget flex items-start flex-col xs:flex-row xs:gap-4 xs:items-center lg:flex-col lg:items-start lg:gap-0 xl:flex-row xl:gap-4 xl:items-center");
const tripCountry = cva("tripCountry text-2xl font-bold text-white");
const tripCity = cva("tripCity text-base font-bold text-white italic");
const tripName = cva("tripName text-base font-bold text-white/80");
const tripDates = cva("tripDates flex border-2 border-white/80 w-fit px-2 py-1 rounded-2xl gap-2");
const tripDate = cva("tripDate text-xs font-semibold text-white/80");
const tripItemRight = cva("tripItemRight flex gap-6 justify-between");
const tripDetails = cva("tripDetails flex gap-6 text-white");
const tripDetailsBlock = cva("tripDetailsBlock flex items-center gap-2");
const tripDetailsBlockIcon = cva("tripDetailsBlockIcon w-full h-full max-w-10");
const tripDetailsBlockText = cva("tripDetailsBlockText font-bold");

export default function TripItem({ trip }: { trip: Trip }) {
  const startDate = trip.startDate && dateAdaptation(trip.startDate);
  const endDate = trip.endDate && dateAdaptation(trip.endDate);

  const tripItemsCount = useLiveQuery(
    () => tripItemsService.getAllByTripId(trip.id!).then(items => items.length),
    [trip.id],
    0
  )

  const tripTasksCount = useLiveQuery(
    () => tripTasksService.getAllByTripId(trip.id!).then(tasks => tasks.length),
    [trip.id],
    0
  )

  return (
    <Link to={`/trip/${trip.id}`} className={tripItem()}>
      <div className={tripItemLeft()}>
        <div className={tripTarget()}>
          <p className={tripCountry()}>{trip.country}</p>
          <div className="flex gap-2">
            {trip.city && <p className={tripCity()}>({trip.city}) </p>}
            {trip.city && <span className={tripCity()}>–</span>}
            {trip.name && <p className={tripName()}>{trip.name}</p>}
          </div>
        </div>

        {startDate && <div className={tripDates()}>
          {startDate && <p className={tripDate()}> {startDate.day + " " + startDate.month + " "} {endDate && startDate.year === endDate.year ? "" : startDate.year} </p>}
          {startDate && endDate && <span className={tripDate()}>—</span>}
          {endDate && <p className={tripDate()}>{endDate.day + " " + endDate.month + " " + endDate.year}</p>}
        </div>}
      </div>

      <div className={tripItemRight()}>
        <div className={tripDetails()}>
          <div className={tripDetailsBlock()}>
            <Luggage className={tripDetailsBlockIcon()} />
            <span className={tripDetailsBlockText()}> {tripItemsCount}</span>
          </div>
          <div className={tripDetailsBlock()}>
            <SquareCheck className={tripDetailsBlockIcon()} />
            <span className={tripDetailsBlockText()}>{tripTasksCount}</span>
          </div>
        </div>

        <button>
          <EllipsisVertical className="hidden md:block"/>
          <Ellipsis className="md:hidden"/>
        </button>
      </div>
    </Link>
  )
}
