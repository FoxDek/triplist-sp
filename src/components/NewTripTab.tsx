import { cva } from "class-variance-authority";
import SubHeader from "../shared/ui/SubHeader";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";

// CVA селекторы
const newTrip = cva("newTrip w-full flex flex-col gap-2");
const newTripContent = cva("newTripContent w-full flex flex-col gap-8");
const newTripActions = cva(
  "newTripActions grid grid-cols-1 md:grid-cols-2 gap-4",
);
const newTripSearch = cva("newTripSearch bg-accent p-4 rounded-3xl");
const newTripSearchContainer = cva("newTripSearchContainer relative");
const newTripSearchInput = cva(
  "newTripSearchInput w-full border-2 border-white/80 rounded-2xl py-2 px-4 outline-none bg-white dark:bg-background-dark dark:text-text-color-dark dark:border-transparent",
);
const newTripSearchIcon = cva(
  "newTripSearchIcon text-text-color dark:text-text-color-dark absolute right-4 top-1/2 transform -translate-y-1/2",
);
const newTripButtons = cva("newTripButtons flex gap-4");
const newTripButtonsButton = cva(
  "newTripButtonsButton text-sm md:text-base px-6 bg-accent h-full py-2 md:px-12 w-full rounded-2xl text-white items-center justify-center hover:scale-101 transition ease-in-out hover:shadow-md hover:shadow-accent/30",
);
const newTripCountries = cva("newTripCountries flex flex-wrap gap-4");

export default function NewTripTab() {
  const { countries, loadMore, hasMore, loading, search, setSearch } =
    useCountries();

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

          <div className={newTripCountries()}>
            {countries.map((country) => (
              <Link
                to={`/new-trip/${country.name}`}
                key={country.cca2}
                className='py-2 px-4 rounded-2xl border-2 border-text-color dark:border-accent text-text-color dark:text-text-color-dark font-semibold hover:scale-101 transition ease-in-out'
              >
                {country.name}
              </Link>
            ))}

            {hasMore && (
              <button
                onClick={loadMore}
                className='py-2 px-4 rounded-2xl border-2 border-accent bg-accent text-white dark:bg-white dark:border-text-color-dark dark:text-accent font-semibold'
              >
                more
              </button>
            )}
          </div>
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
