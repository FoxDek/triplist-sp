import { cva } from "class-variance-authority";
import SubHeader from "../../shared/ui/SubHeader";
import * as Icons from "lucide-react";
import { Plus, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from '../../shared/ui/Modal';
import AddBaggageItemForm from './AddBaggageItemForm';
import { useBaggageItems } from "../../hooks/useBaggageItems";

const tripBaggage = cva("tripBaggage w-full flex flex-col gap-2");
const tripBaggageContent = cva("tripBaggageContent w-full flex flex-col gap-4");
const tripBaggageList = cva("tripBaggageList grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4");
const tripBaggageListItem = cva(
  "tripBaggageListItem group flex items-center justify-center gap-2 flex-col p-2 rounded-2xl border-2 border-accent cursor-pointer hover:scale-103 transition ease-in-out min-h-20",
  {
    variants: {
      isChosen: {
        true: "bg-accent",
        false: "",
      },
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
const addBaggageButton = cva(
  "bg-accent text-white text-md font-bold py-2 px-8 rounded-2xl hover:scale-105 hover:shadow-md hover:shadow-accent/30 transition duration-300 ease-in-out self-center"
);


export default function TripPageBaggage() {
  const { allItems, toggleItem, chosenItems, addNewCustomItem } = useBaggageItems();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={tripBaggage()}>
      <SubHeader headerText='Trip Baggage' />

      <div className={tripBaggageContent()}>
        <ul className={tripBaggageList()}>
          {allItems.map((item) => {
            const IconComponent = Icons[item.icon as keyof typeof Icons] as LucideIcon;
            const isChosen = chosenItems.includes(item.title);

            return (
              <li
                key={item.id}
                className={tripBaggageListItem({ isChosen })}
                onClick={() => toggleItem(item.title)}
              >
                {item.icon && (
                  <IconComponent
                    className={tripBaggageListItemIcon({ isChosen })}
                  />
                )}
                <span className={tripBaggageListItemLabel({ isChosen })}>
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>

        <button
          className={addBaggageButton()}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={'accent'}>
          <AddBaggageItemForm addNewCustomItem={addNewCustomItem} onClose={() => setIsModalOpen(false)} toggleItem={toggleItem}/>
        </Modal>
      </div>
    </section>
  );
}
