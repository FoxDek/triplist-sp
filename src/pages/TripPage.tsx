import { useParams } from "react-router-dom";
import type { Trip, TripFormData } from "../entities/types";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import TripPageForm from "../components/trip-page/TripPageForm";
import TripPageBaggage from '../components/trip-page/TripPageBaggage';
import TripPageTasks from '../components/trip-page/TripPageTasks';

const tripData: Trip = {
  id: 1231,
  name: 'Trip of the year',
  purpose: 'Vacation',
  country: 'Georgia',
  city: 'Tbilisi',
  startDate: new Date('2022-01-16T10:00:00'),
  endDate: new Date('2022-01-20T18:00:00'),
  itemIds: [],
  taskIds: []
}

const defaultValues: TripFormData = {
  name: '',
  purpose: '',
  country: '',
  city: '',
  startDate: undefined,
  endDate: undefined,
}

const trip = cva('trip flex flex-col items-center w-full h-full gap-20 p-4');
const tripTitle = cva('tripTitle text-3xl md:text-6xl font-bold text-center text-text-color dark:text-text-color-dark');



export default function TripPage() {
  const { countryName, id } = useParams();
    const isNewTrip = !id;
  const initialCountry = countryName && isNewTrip
    ? decodeURIComponent(countryName) : '';

  const [formData, setFormData] = useState<TripFormData>(() => ({
    ...defaultValues,
    country: initialCountry
  }));


  useEffect(() => {
    if (!isNewTrip) {
      setTimeout(() => {
        setFormData({
          name: tripData.name || '',
          purpose: tripData.purpose || '',
          country: tripData.country || '',
          city: tripData.city || '',
          startDate: tripData.startDate?.toISOString().slice(0, 10) || undefined,
          endDate: tripData.endDate?.toISOString().slice(0, 10) || undefined,
        })
      }, 300);
    }
  }, [isNewTrip]);





  return (
    <div className={trip()}>
      <h1 className={tripTitle()}>{isNewTrip ? 'New Trip' : 'My Trip'}</h1>

      <div className="tripContent flex flex-col items-center w-full h-full gap-20 max-w-4xl">

        <TripPageForm formData={formData} setFormData={setFormData}/>

        <TripPageBaggage />

        <TripPageTasks />
      </div>
    </div>
  )
}
