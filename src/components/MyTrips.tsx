import { cva } from "class-variance-authority";
import { trips } from "../assets/data";
import TripItem from "./TripItem";
import SubHeader from "../shared/ui/SubHeader";

// CVA селекторы
const myTrips = cva("myTrips w-full flex flex-col gap-2");
const myTripsList = cva(
  "myTripsList w-full flex flex-col gap-4 rounded-3xl lg:grid lg:grid-cols-2",
);
const myTripsEmpty = cva(
  "myTripsEmpty flex items-center justify-center h-20 w-full border-accent border-2 rounded-3xl",
);
const myTripsEmptyText = cva("myTripsEmptyText text-xl font-semibold");

export default function MyTrips() {
  return (
    <section className={myTrips()}>
      <SubHeader headerText='My Trips' additionalClass='myTripsHeader ml-4' />

      {trips.length > 0 ? (
        <div className={myTripsList()}>
          {trips.map((trip) => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className={myTripsEmpty()}>
          <p className={myTripsEmptyText()}>No Trips</p>
        </div>
      )}
    </section>
  );
}
