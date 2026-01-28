import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { useState } from "react";
import Button from '../../shared/ui/Button';
import { tripItemsService } from "../../services/tripItems.service";

const baggageFormInputContainer = cva("baggageFormInputContainer flex flex-col items-center gap-1")
const baggageFormInput = cva("baggageFormInput w-full border-2 border-white/80 rounded-2xl py-2 px-4 outline-none bg-white dark:bg-background-dark dark:text-text-color-dark dark:border-transparent transition ease-in-out");
const baggageForm = cva("baggageForm flex flex-col items-center gap-4");
const baggageFormCheckboxContainer = cva("aspect-square w-7 flex items-center justify-center bg-background p-1 rounded-xl cursor-pointer");
const baggageFormCheckboxLabel = cva("text-white font-medium");


interface AddBaggageItemFormProps {
  onClose: () => void,
  tripId: number
}


export default function AddBaggageItemForm({onClose, tripId}: AddBaggageItemFormProps) {
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [formInfo, setFormInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const itemTitle = formData.get("item") as string;

    if (!itemTitle) {
      setFormInfo('Item name is required');
      return;
    }

    try {
      await tripItemsService.create({
        title: itemTitle, tripId: Number(tripId), isTaken: false
      })
      console.log('Item added!');
    } catch (error) {
      console.error(error);
    } finally {
      setFormInfo('');
      onClose();
    }
  }

  return (
    <form className={baggageForm()} onSubmit={handleSubmit} >
      <div className={baggageFormInputContainer()}>
        <input
          name="item"
          type="text"
          placeholder="item name..."
          className={baggageFormInput()}
        />
        {formInfo && <p className="text-white/50 italic"> {formInfo}</p>}
      </div>


      <div
        className="flex items-center gap-2 justify-start w-full"
        onClick={() => setSaveAsDefault(!saveAsDefault)}
      >
        <div className={baggageFormCheckboxContainer()}>
          {saveAsDefault && <Check className="w-full h-full text-accent" strokeWidth={2.75} />}
        </div>
        <span className={baggageFormCheckboxLabel()}>Save as default</span>
      </div>

      <Button mode="light" text="Add" type="submit" />
    </form>
  );
}
