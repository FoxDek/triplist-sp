import { motion } from "framer-motion";
import { trips } from "../assets/data";
import TripItem from "../components/TripItem";

export default function Trips() {

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="motionContainer flex items-center justify-center h-full w-full"
    >
      <div className="tripsContent flex flex-col items-center w-full h-full gap-5 p-4">
        <h1 className="tripsTitle text-6xl font-bold text-center text-text-color dark:text-text-color-dark">TripList</h1>

        <div className="myTrips w-full flex flex-col gap-2">
          <h2 className="myTripsHeader text-xl font-bold text-text-color dark:text-text-color-dark ml-4">My Trips</h2>

          <div className="myTripsList w-full flex flex-col gap-4 rounded-3xl">
            {trips.length > 0 ?
            trips.map((trip) => (
              <TripItem key={trip.id} trip={trip} />
            ))
            :
            <div className="flex items-center justify-center h-20">
              <p className="text-xl font-semibold">No Trips</p>
            </div>
            }

          </div>
        </div>
      </div>
    </motion.div>
  )
}




