import { cva } from "class-variance-authority";
import { useState } from "react";
import { purposeDropdownData } from "../../assets/dropdown-lists-data";
import { useCountries } from "../../hooks/useCountries";
import type { TripFormData } from "../../entities/types";
import DropdownInput from "../../shared/ui/DropdownInput";

interface TripPageFormProps {
  formData: TripFormData;
  setFormData: React.Dispatch<React.SetStateAction<TripFormData>>
}

const tripForm = cva('tripForm grid w-full grid-cols-1 sm:grid-cols-2 bg-accent p-4 rounded-3xl gap-4 relative');
const tripFormInput = cva("tripFormInput w-full border-2 border-white/80 rounded-2xl py-2 px-4 outline-none bg-white dark:bg-background-dark dark:text-text-color-dark dark:border-transparent transition ease-in-out");

export default function TripPageForm({ formData, setFormData }: TripPageFormProps) {
  const [usedDropdown, setUsedDropdown] = useState<string>('');
  const {allCountries, loading} = useCountries();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSelect = (name: string, selectedValue: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: selectedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <form action="" className={tripForm()} onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="name" value={formData.name} onChange={handleChange} className={tripFormInput()} />
      <DropdownInput 
        value={formData.purpose}
        name="purpose"
        placeholder="purpose"
        onChange={handleChange}
        setUsedDropdown={setUsedDropdown}
        usedDropdown={usedDropdown}
        onSelect={handleSelect}
        options={purposeDropdownData}
      />
      <DropdownInput 
        value={formData.country}
        name="country"
        placeholder="country"
        onChange={handleChange}
        setUsedDropdown={setUsedDropdown}
        usedDropdown={usedDropdown}
        onSelect={handleSelect}
        options={allCountries.map((c) => c.name)}
        isLoading={loading}
      />
      {/* <input name="country" type="text" placeholder="country" value={formData.country} onChange={handleChange} className={tripFormInput()} /> */}
      <input name="city" type="text" placeholder="city" value={formData.city} onChange={handleChange} className={tripFormInput()} />
      <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className={tripFormInput()} />
      <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className={tripFormInput()} />

      {/* {usedDropdown !== '' && <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/50"></div>} */}

      <div className={`tripFormOverlay absolute top-0 left-0 right-0 bottom-0 z-10 rounded-3xl bg-black/50 ${usedDropdown === '' ? 'pointer-events-none' : 'opacity-100'} opacity-0 transition-all duration-300 ease-in-out `}></div>

    </form>
  )
}
