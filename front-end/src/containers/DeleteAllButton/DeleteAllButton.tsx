import type { TaskData } from "../../interfaces/TaskData";
import { useTaskDataDelete } from "../../hooks/useTaskDataDelete";
import './DelleteAllButton.css'

interface DeleteAllButtonProps {
    tasksData: TaskData[];
}


export function DeleteAllButton ({tasksData}: DeleteAllButtonProps) {
    const { mutate: deleteTask } = useTaskDataDelete();
    
    const deleteAllTasks = async () => {
        
        await Promise.all(tasksData.map(task => task.id ? deleteTask(task.id) : Promise.resolve()));
    }

    return(
        <button className='delete-all-button' onClick={deleteAllTasks}>
            Excluir todas as tarefas
        </button>
    )
}