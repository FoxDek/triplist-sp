import { useState } from "react";
import { cva } from "class-variance-authority";
import { Check, Plus, ListPlus, X } from "lucide-react";
import { Modal } from "../../shared/ui/Modal";
import SubHeader from "../../shared/ui/SubHeader";
import TasksFormModal from './TasksFormModal';
import { useLiveQuery } from "dexie-react-hooks";
import { tripTasksService } from "../../services/tripTasks.service";

interface TripPageTasksProps {
  tripId: number;
}

const tripTasks = cva("tripTasks w-full flex flex-col gap-4");
const tripTasksList = cva("flex flex-col gap-2 min-h-40");
const taskItem = cva(
  "flex items-center justify-between gap-4 rounded-2xl border-2 border-accent cursor-pointer transition hover:scale-101 overflow-hidden",
  {
    variants: {
      completed: {
        true: "line-through",
        false: "",
      },
    },
  }
);
const taskCheckbox = cva("w-6 h-6 rounded-xl flex items-center justify-center border-2 border-accent");
const taskForm = cva("flex gap-2 w-full");
const taskFormInputContainer = cva("taskFormInputContainer flex bg-accent w-full p-2 rounded-2xl")
const taskFormInput = cva("flex w-full border-2 border-white/80 py-2 px-4 outline-none bg-white dark:bg-background-dark rounded-xl");
const taskFormButton = cva("bg-accent text-white px-4 rounded-2xl hover:scale-105 transition");
const addDefaultButton = cva("flex gap-4 text-accent font-bold py-2 px-6 rounded-2xl self-center hover:scale-101 transition");



export default function TripPageTasks({ tripId }: TripPageTasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasks = useLiveQuery(
    () => tripTasksService.getAllByTripId(tripId),
    [tripId]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("task") as string;

    if (!title) return;

    await tripTasksService.create({ text: title, completed: false, tripId });
    
    form.reset();
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    await tripTasksService.update(id, {completed: !completed})
  };

  const handleDeleteTask = async (id: number) => {
    await tripTasksService.delete(id);
  };

  return (
    <section className={tripTasks()}>
      <SubHeader headerText="Trip Tasks" />

      <form className={taskForm()} onSubmit={handleSubmit}>
        <div className={taskFormInputContainer()}>
          <input
            name="task"
            placeholder="New task..."
            className={taskFormInput()}
          />
        </div>
        <button className={taskFormButton()} type="submit">
          <Plus />
        </button>
      </form>

      {tasks && <ul className={tripTasksList()}>
        {tasks.map(task => {
          if (!task.id) return null

          return (
          <li
            key={task.id}
            className={taskItem({ completed: task.completed })}
            onClick={() => handleToggleTask(task.id!, task.completed)}
          >
            <div className="flex gap-3 p-3">
              <div className={taskCheckbox()}>
                {task.completed && (
                  <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                )}
              </div>
              <span>{task.text}</span>
            </div>

            <button onClick={() => handleDeleteTask(task.id!)} className="p-3 hover:bg-accent/20 transition ease-in-out">
              <X className="text-accent"/>
            </button>
          </li>
        )})}
      </ul>}

      <button
        className={addDefaultButton()}
        onClick={() => setIsModalOpen(true)}
      >
        <ListPlus /> Add default tasks
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={"accent"}>
        <TasksFormModal setIsModalOpen={setIsModalOpen} tripId={tripId} />
      </Modal>
    </section>
  );
}
