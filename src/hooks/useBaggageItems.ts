import { useMemo, useState } from "react";
import type { BaggageItem } from "../entities/types";
import { baggageDefaultItems } from "../assets/data";

export function useBaggageItems() {
  const [chosenItems, setChosenItems] = useState<string[]>(["Passport"]);
  const [customItems, setCustomItems] = useState<BaggageItem[]>([
    // {
    //   id: 10,
    //   title: "Custom Item 1",
    //   // icon: 'IdCard',
    //   isCustom: true,
    // },
  ]);

  const toggleItem = (id: string) => {
    setChosenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const allItems = useMemo(
    () => [...baggageDefaultItems, ...customItems],
    [customItems],
  );

  const addNewCustomItem = (item: BaggageItem, saveAsDefault: boolean) => {
    if (saveAsDefault) {
      console.log('Saved as default');
    }

    setCustomItems((prev) => [...prev, item]);
  };

  return { allItems, toggleItem, setCustomItems, chosenItems, addNewCustomItem };
}
