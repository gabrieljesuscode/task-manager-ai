import { useEffect, useState } from "react";
import type { TaskData } from "../../interfaces/TaskData";

interface CategoryBtnProps {
    category: string;
    taskTitles: string[];
    visibleTasks: TaskData[];
    handleSelectedTitles: (taskTitles: string[]) => void;
}

export function CategoryBtn ({ category, taskTitles, visibleTasks, handleSelectedTitles }: CategoryBtnProps) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const checkIfSelected = () => {

            const allSelected = visibleTasks.every(task => taskTitles.includes(task.title));
            
            setIsSelected(allSelected);
        }

        checkIfSelected();
    },[visibleTasks, taskTitles]);

 
    
    return (
        <button className={`category-btn ${isSelected ? 'selected' : ''}`}  
        onClick={() =>{ 
              
                    handleSelectedTitles(taskTitles);
                    if(isSelected) {
                        setIsSelected(false);
                    }
            }
        }>
            {category}
        </button>
    )
}
