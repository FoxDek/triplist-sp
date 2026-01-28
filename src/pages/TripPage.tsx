import { useParams } from "react-router-dom";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import TripPageForm from "../components/trip-page/TripPageForm";
import TripPageBaggage from '../components/trip-page/TripPageBaggage';
import TripPageTasks from '../components/trip-page/TripPageTasks';
import type { TripFormData } from "../db/schema";
import Button from '../shared/ui/Button';
import { tripsService } from "../services/trips.service";
import { tripToForm } from "../utils/trips.mapper";

const defaultValues: TripFormData = {
  name: '',
  purpose: '',
  country: '',
  city: '',
  startDate: '',
  endDate: '',
}

const trip = cva('trip flex flex-col items-center w-full h-full gap-20 p-4');
const tripTitle = cva('tripTitle text-3xl md:text-6xl font-bold text-center text-text-color dark:text-text-color-dark');



export default function TripPage() {
  const { id } = useParams();

  const [formData, setFormData] = useState<TripFormData>(() => ({
    ...defaultValues,
  }));

  const handleUpdateTrip = () => {
    const newTripData = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined 
    };

    tripsService.update(+id!, newTripData)
      .then(() => console.log('Trip updated!'))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    tripsService.getById(+id!)
      .then(trip => {
        if (trip) {
          setFormData(tripToForm(trip))
        } else {
          setFormData(defaultValues)
        }
      })
      .catch(
        err => console.error(err)
      );

    
  }, [id]);



  return (
    <div className={trip()}>
      <h1 className={tripTitle()}>{'My Trip'}</h1>

      <div className="tripContent flex flex-col items-center w-full h-full gap-20 max-w-4xl pb-20">

        <TripPageForm formData={formData} setFormData={setFormData}/>

        <TripPageBaggage tripId={Number(id)} />

        <TripPageTasks tripId={Number(id)} />

        <Button mode="accent" text={'Update Trip'} onClick={handleUpdateTrip}/>
      </div>
    </div>
  )
}
