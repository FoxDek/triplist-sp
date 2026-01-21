import { motion } from "framer-motion";
import MyTrips from "../components/MyTrips";
import NewTripTab from "../components/NewTripTab";

export default function Trips() {

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="motionContainer flex items-center justify-center h-full w-full"
    >
      <div className="tripsContent flex flex-col items-center w-full h-full gap-20 p-4">
        <h1 className="tripsTitle text-3xl md:text-6xl font-bold text-center text-text-color dark:text-text-color-dark">TripList</h1>

        <MyTrips />

        <NewTripTab />

      </div>
    </motion.div>
  )
}




