import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { useState } from "react";
import type { BaggageItem } from "../../entities/types";

// CVA селекторы
const tripFormInput = cva("baggageFormInput w-full border-2 border-white/80 rounded-2xl py-2 px-4 outline-none bg-white dark:bg-background-dark dark:text-text-color-dark dark:border-transparent transition ease-in-out");
const baggageForm = cva("baggageForm flex flex-col items-center gap-4");
const baggageFormCheckboxContainer = cva("aspect-square w-7 flex items-center justify-center bg-background p-1 rounded-xl cursor-pointer");
const baggageFormCheckboxLabel = cva("text-white font-medium");
const baggageFormButton = cva("baggageFormButton bg-background text-accent text-md font-bold py-2 px-8 rounded-2xl hover:scale-105 hover:shadow-md hover:shadow-accent/30 transition duration-300 ease-in-out self-center");


interface AddBaggageItemFormProps {
  addNewCustomItem: (item: BaggageItem, saveAsDefault: boolean) => void,
  onClose: () => void,
  toggleItem: (id: string) => void
}


export default function AddBaggageItemForm({addNewCustomItem, onClose, toggleItem}: AddBaggageItemFormProps) {
  const [saveAsDefault, setSaveAsDefault] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submitted');
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const itemTitle = formData.get("item") as string;

    const item = {id: Date.now(), title: itemTitle, isCustom: true}
    addNewCustomItem(item, saveAsDefault);
    onClose();
    toggleItem(itemTitle);
  }

  return (
    <form className={baggageForm()} onSubmit={handleSubmit}>
      <input name="item" type="text" placeholder="item name..." className={tripFormInput()}
      />

      <div
        className="flex items-center gap-2 justify-start w-full"
        onClick={() => setSaveAsDefault(!saveAsDefault)}
      >
        <div className={baggageFormCheckboxContainer()}>
          {saveAsDefault && <Check className="w-full h-full text-accent" strokeWidth={2.75} />}
        </div>
        <span className={baggageFormCheckboxLabel()}>Save as default</span>
      </div>

      <button className={baggageFormButton()} type="submit">
        Add
      </button>
    </form>
  );
}
