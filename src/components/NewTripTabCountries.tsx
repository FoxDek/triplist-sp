import { cva } from "class-variance-authority";
import { useCountries } from "../hooks/useCountries";
import { useNavigate } from "react-router-dom";
import { tripsService } from "../services/trips.service";
import { baggageDefaultItems } from "../assets/data";
import { tripItemsService } from "../services/tripItems.service";
import Button from '../shared/ui/Button';

const newTripCountries = cva("newTripCountries flex flex-wrap gap-4");
const newTripCountriesItem = cva('py-2 px-4 rounded-2xl border-2 border-text-color dark:border-accent text-text-color dark:text-text-color-dark font-semibold hover:scale-101 transition ease-in-out')

const userSettings = {
  defaultItems: ['Passport', 'Visa', 'Phone', 'Charger', 'Credit card', 'Cash']
}


export default function NewTripTabCountries() {
  const { countries, loadMore, hasMore } = useCountries();
  const navigate = useNavigate();
  
  
  const handleCreateTrip = async (coutryName: string) => {
    const tripId = await tripsService.create({
      country: coutryName,
    });

    const itemsToCreate = baggageDefaultItems.filter(item => userSettings.defaultItems.includes(item.title));
    await tripItemsService.createMany(itemsToCreate, tripId);
    navigate(`/trip/${tripId}`);
  };


  return (
    <div className={newTripCountries()}>
      {countries.map((country) => (
        <button
          onClick={() => handleCreateTrip(country.name)}
          key={country.cca2}
          className={newTripCountriesItem()}
        >
          {country.name}
        </button>
      ))}

      {hasMore && (
        // <button
        //   onClick={loadMore}
        //   className='py-2 px-4 rounded-2xl border-2 border-accent bg-accent text-white dark:bg-white dark:border-text-color-dark dark:text-accent font-semibold'
        // >
        //   more
        // </button>

        <Button mode="accent" onClick={loadMore} text="more" type="button" addStyle="px-4! border-2 border-accent" />
      )}
    </div>
  )
}
