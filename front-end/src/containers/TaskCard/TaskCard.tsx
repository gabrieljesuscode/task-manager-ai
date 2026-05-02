import { useState } from 'react';
import './TaskCard.css';
import { useTaskDataUpdate } from '../../hooks/useTaskDataUpdate';
import type { TaskData } from '../../interfaces/TaskData';
// import { useTaskDataDelete } from '../../hooks/useTaskDataDelete';

interface TaskCardProps {
    id: number,
    title: string,
    description: string,
    isCompleted: boolean
}


export function TaskCard ({ id, title, description, isCompleted }: TaskCardProps){

    const [completed, setCompleted] = useState(isCompleted);
    const [ showDescription, setShowDescription ] = useState(false);
    const { mutate: updateTask } = useTaskDataUpdate();
    // const { mutate: deleteTask } = useTaskDataDelete();


    const handleIsCompleted = () => {
        const nextState = !completed;

        setCompleted(nextState);
        
        const taskData: TaskData = {
            id: id,
            title,
            description,
            isCompleted: nextState  
        }

        updateTask(taskData);
        console.log("atualizado");
    };

    

    const handleShowDescription = () => {
        setShowDescription(prev => !prev);
    }
    

    return(
        <div className={`card-container ${completed ? 'completed' : ''}`} >
            
            <div className="card-body">
                <div className='description-icon-area' onClick={handleShowDescription}>
                    <i className={`bi bi-caret-right-fill description-icon ${showDescription ? 'rotated' : ''}`}></i>
                </div>
                <div className={`title-area ${completed ? 'completed-title' : ''}`}>
                    {title}
                </div>
                {/* <div onClick={() => deleteTask(id)}>
                    Remover
                </div> */}
                <div className='completed-area' onClick={handleIsCompleted}>
                    {completed ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-circle"></i>}
                    {completed ? <p>Concluída</p> : <p>Marcar como concluída</p>}
                </div>
            </div>
            
            <div className='description-area'>
                {showDescription && <div>{description}</div>}
            </div>
        
        </div>
    )
}