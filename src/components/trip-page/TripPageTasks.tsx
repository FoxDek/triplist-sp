import { useState } from "react";
import { cva } from "class-variance-authority";
import { Check, Plus, ListPlus } from "lucide-react";
import { useTripTasks } from "../../hooks/useTripTasks";
import { Modal } from "../../shared/ui/Modal";
import SubHeader from "../../shared/ui/SubHeader";

const tripTasks = cva("tripTasks w-full flex flex-col gap-4");
const tripTasksList = cva("flex flex-col gap-2");
const taskItem = cva(
  "flex items-center gap-3 p-3 rounded-2xl border-2 border-accent cursor-pointer transition",
  {
    variants: {
      completed: {
        true: "bg-accent text-white line-through",
        false: "",
      },
    },
  }
);
const taskCheckbox = cva(
  "w-6 h-6 rounded-xl flex items-center justify-center border-2 border-accent"
);
const taskForm = cva("flex gap-2 w-full");
const taskInput = cva(
  "flex-1 border-2 border-white/80 rounded-2xl py-2 px-4 outline-none bg-white dark:bg-background-dark"
);
const taskButton = cva(
  "bg-accent text-white px-4 rounded-2xl hover:scale-105 transition"
);
const addDefaultButton = cva(
  "bg-background text-accent font-bold py-2 px-6 rounded-2xl self-center hover:scale-105 transition"
);


export default function TripPageTasks() {
  const { tasks, addTask, toggleTask, addDefaultTasks } = useTripTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("task") as string;

    if (!title) return;

    addTask(title, 1);
    form.reset();
  };

  return (
    <section className={tripTasks()}>
      <SubHeader headerText="Trip Tasks" />

      <form className={taskForm()} onSubmit={handleSubmit}>
        <input
          name="task"
          placeholder="New task..."
          className={taskInput()}
        />
        <button className={taskButton()} type="submit">
          <Plus />
        </button>
      </form>

      <ul className={tripTasksList()}>
        {tasks.map(task => (
          <li
            key={task.id}
            className={taskItem({ completed: task.completed })}
            onClick={() => toggleTask(task.id)}
          >
            <div className={taskCheckbox()}>
              {task.completed && (
                <Check className="w-4 h-4 text-accent" strokeWidth={3} />
              )}
            </div>
            <span>{task.text}</span>
          </li>
        ))}
      </ul>

      <button
        className={addDefaultButton()}
        onClick={() => setIsModalOpen(true)}
      >
        <ListPlus /> Add default tasks
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={"accent"}>
        <div className="flex flex-col gap-4">
          <p className="text-center font-medium">
            Add common pre-trip tasks?
          </p>
          <button
            className={taskButton()}
            onClick={() => {
              addDefaultTasks();
              setIsModalOpen(false);
            }}
          >
            Add
          </button>
        </div>
      </Modal>
    </section>
  );
}
