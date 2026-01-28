import { cva } from "class-variance-authority";
import SubHeader from "../shared/ui/SubHeader";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import NewTripTabCountries from "./NewTripTabCountries";

// CVA селекторы
const newTrip = cva("newTrip w-full flex flex-col gap-2");
const newTripContent = cva("newTripContent w-full flex flex-col gap-8");
const newTripActions = cva("newTripActions grid grid-cols-1 md:grid-cols-2 gap-4");
const newTripSearch = cva("newTripSearch bg-accent p-2 rounded-2xl");
const newTripSearchContainer = cva("newTripSearchContainer relative");
const newTripSearchInput = cva("newTripSearchInput w-full border-2 border-white/80 rounded-xl py-2 px-4 outline-none bg-white dark:bg-background-dark dark:text-text-color-dark dark:border-transparent transition ease-in-out");
const newTripSearchIcon = cva("newTripSearchIcon text-text-color dark:text-text-color-dark absolute right-4 top-1/2 transform -translate-y-1/2");
const newTripButtons = cva("newTripButtons flex gap-4");
const newTripButtonsButton = cva("newTripButtonsButton text-sm md:text-base px-6 bg-accent h-full py-2 md:px-12 w-full rounded-2xl text-white items-center justify-center hover:scale-101 transition ease-in-out hover:shadow-md hover:shadow-accent/30");



export default function NewTripTab() {
  const { loading, search, setSearch } = useCountries();

  return (
    <section className={newTrip()}>
      <SubHeader headerText='New Trip' />

      {!loading ? (
        <div className={newTripContent()}>
          <div className={newTripActions()}>
            <div className={newTripSearch()}>
              <div className={newTripSearchContainer()}>
                <input
                  type='text'
                  value={search}
                  placeholder='Country...'
                  maxLength={20}
                  onChange={(e) => setSearch(e.target.value)}
                  className={newTripSearchInput()}
                />
                <Search className={newTripSearchIcon()} />
              </div>
            </div>

            <div className={newTripButtons()}>
              <Link to='/history' className={newTripButtonsButton()}>
                History
              </Link>
              <Link
                to='/history'
                className={newTripButtonsButton({
                  className: "hover:shadow-md hover:shadow-accent/50",
                })}
              >
                Empty Trip
              </Link>
            </div>
          </div>
          
          <NewTripTabCountries />

        </div>
      ) : (
        <div className='flex items-center justify-center h-full w-full'>
          <h2 className='text-2xl font-bold text-text-color dark:text-text-color-dark'>
            Loading...
          </h2>
        </div>
      )}
    </section>
  );
}
