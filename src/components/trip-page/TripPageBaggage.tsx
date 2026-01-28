import { cva } from "class-variance-authority";
import SubHeader from "../../shared/ui/SubHeader";
import * as Icons from "lucide-react";
import { Plus, Trash2, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from '../../shared/ui/Modal';
import { useLiveQuery } from "dexie-react-hooks";
import { tripItemsService } from "../../services/tripItems.service";
import AddBaggageItemForm from "./BaggageFormModal";
import Button from '../../shared/ui/Button';

interface TripPageBaggageProps {
  tripId: number
}


const tripBaggage = cva("tripBaggage w-full flex flex-col gap-4");
const tripBaggageContent = cva("tripBaggageContent w-full flex flex-col gap-4");
const tripBaggageList = cva("tripBaggageList grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4");
const tripBaggageListItem = cva(
  "tripBaggageListItem group flex items-center justify-center gap-2 flex-col p-2 rounded-2xl border-2 border-accent cursor-pointer hover: transition ease-in-out min-h-20",
  {
    variants: {
      isChosen: {
        true: "bg-accent",
        false: "",
      },
      deletionActive: {
        true: "hover:animate-shake",
        false: "hover:scale-103",
      }
    },
  }
);
const tripBaggageListItemIcon = cva(
  "tripBaggageListItemIcon text-accent w-full h-full max-h-10",
  {
    variants: {
      isChosen: {
        true: "text-white",
        false: "",
      },
    },
  }
);
const tripBaggageListItemLabel = cva(
  "tripBaggageListItemLabel text-text-color dark:text-text-color-dark text-center text-xs font-bold truncate max-w-20 sm:max-w-25",
  {
    variants: {
      isChosen: {
        true: "text-white",
        false: "",
      },
    },
  }
);





export default function TripPageBaggage({tripId}: TripPageBaggageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletionActive, setDeletionActive] = useState(false);

  const tripItems = useLiveQuery(
    () => tripItemsService.getAllByTripId(Number(tripId)),
    [tripId]
  )

  const handleToggleItem = async (itemId: number, isTaken: boolean) => {
    await tripItemsService.update(itemId, { isTaken: !isTaken });
  }

  const handleDeleteItem = async (itemId: number) => {
    await tripItemsService.delete(itemId);
  }

  return (
    <section className={tripBaggage()}>
      <div className="flex flex-col gap-2 xs:flex-row justify-between items-center">
        <SubHeader headerText='Trip Baggage' />
        <div className={`border w-fit px-4 py-1 border-accent rounded-xl transition ease-in-out ${deletionActive ? 'opacity-100' : 'opacity-0'}`} >
          <p className="italic text-accent">Choose items to delete</p>
        </div>
      </div>

      <div className={tripBaggageContent()}>
        {tripItems && tripItems.length > 0 ? <ul className={tripBaggageList()}>
          {tripItems.map((item) => {
            if (!item.id) return null;

            const IconComponent = Icons[item.icon as keyof typeof Icons] as LucideIcon;

            return (
              <li
                key={item.id}
                className={tripBaggageListItem({ isChosen: item.isTaken, deletionActive })}
                onClick={() => deletionActive ? handleDeleteItem(item.id!) : handleToggleItem(item.id!, item.isTaken)}
              >
                {item.icon && (
                  <IconComponent
                    className={tripBaggageListItemIcon({ isChosen: item.isTaken })}
                  />
                )}
                <span className={tripBaggageListItemLabel({ isChosen: item.isTaken })}>
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
        : 
        <span className="text-text-color dark:text-text-color-dark">
          No baggage added
        </span>
        }

        <div className="tripBaggageButtons flex gap-4 justify-center items-center">
          <Button mode="accent" onClick={() => setIsModalOpen(true)} addStyle="border-1 border-accent">
            <Plus className="text-white"/>
          </Button>
          <Button mode="accent" onClick={() => setDeletionActive(!deletionActive)} addStyle={`border-1 border-accent ${deletionActive ? 'bg-white' : ''}`} >
            <Trash2 className={deletionActive ? 'text-accent' : 'text-white'}/>
          </Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={'accent'}>
          <AddBaggageItemForm onClose={() => setIsModalOpen(false)} tripId={tripId} />
        </Modal>
      </div>
    </section>
  );
}
