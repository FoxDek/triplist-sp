// hooks/useTripTasks.ts
import { useState } from "react";
import type { TripTask } from "../entities/types";

const defaultTasks: TripTask[] = [
  { id: 1, tripId: 1, text: "Turn off water", completed: false },
  { id: 2, tripId: 1, text: "Turn off lights", completed: false },
  { id: 3, tripId: 1, text: "Close windows", completed: false },
  { id: 4, tripId: 1, text: "Take documents", completed: false },
];

export function useTripTasks() {
  const [tasks, setTasks] = useState<TripTask[]>([]);

  const addTask = (text: string, tripId: number) => {
    setTasks(prev => [
      ...prev,
      { id: Date.now(), tripId, text, completed: false }
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const addDefaultTasks = () => {
    setTasks(prev => {
      const existingTitles = prev.map(t => t.text);
      const newTasks = defaultTasks.filter(
        t => !existingTitles.includes(t.text)
      );
      return [...prev, ...newTasks];
    });
  };

  return {
    tasks,
    addTask,
    toggleTask,
    addDefaultTasks,
  };
}
