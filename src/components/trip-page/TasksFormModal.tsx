import { defaultTasks } from '../../assets/data';
import { tripTasksService } from '../../services/tripTasks.service';
import Button from '../../shared/ui/Button';

interface TasksFormModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tripId: number
}






export default function TasksFormModal({setIsModalOpen, tripId}: TasksFormModalProps) {

  const handleAddAllTasks = () => {
    defaultTasks.forEach(async (task) => {
      await tripTasksService.create({ text: task, completed: false, tripId });
    })
    
    setIsModalOpen(false)
  }

  return (
    <div className="tasksForm flex flex-col gap-8">

      <ul className='flex flex-col gap-2'>
        {defaultTasks.map((task, index) => (
          <li key={index} className="flex items-center w-full cursor-pointer" onClick={() => {}}>
            <span className='bg-background px-8 py-1 rounded-xl w-full'>{task}</span>
          </li>
        ))}
      </ul>
      
      <Button mode="light" onClick={handleAddAllTasks} text="Add all" />
    </div>
  )
}
