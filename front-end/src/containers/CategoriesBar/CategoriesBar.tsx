import type { TaskData } from '../../interfaces/TaskData';
import './Categories.css';
import { useEffect, useRef, useState } from 'react';
import { CategoryBtn } from './CategoryBtn';
import { AICategories } from '../../hooks/AiCategories';



interface CategoriesBarProps {
    data: TaskData[];
    visibleTasks: TaskData[];
    handleSelectedTitles: (taskTitles: string[]) => void;
}
    

export function CategoriesBar ({data, visibleTasks, handleSelectedTitles}: CategoriesBarProps) {

    const [categories, setCategories] = useState<[string, string[]][]>([]);
    const lastTitlesRef = useRef('');

    useEffect(() => {

        const categoriesList = async () => {
            if (data.length < 3) {
                setCategories([]);
                return;
            }
            const response = await AICategories(); // Vem como um objeto de chaves e valor
            
            if(!response) {
                return;
            }
            console.log("Resposta da API de categorias:", Object.entries(response));
            setCategories(Object.entries(response)); // 
        }
        
        const currentTitlesRef = data.map(item => item.title).join(', ');
        if (currentTitlesRef !== lastTitlesRef.current) {
            console.log("Antigos títulos:", lastTitlesRef.current);
            console.log("Novos títulos:", currentTitlesRef);

            lastTitlesRef.current = currentTitlesRef;
            categoriesList();
        }
    }, [data]);


    const categoryButtons = categories
        .map(([category, taskTitles]) => (
            <CategoryBtn 
                key={category}
                category={category} 
                taskTitles={taskTitles} 
                handleSelectedTitles={handleSelectedTitles}
                visibleTasks={visibleTasks}
            />
        ));

    return(
        <div className='categories-container'>

            <div className="title">
                <i className="bi bi-lightning-charge"></i>
                <h2>Categorias geradas por IA</h2>
            </div>
            
            <ul>
                {categories ? 
                    categoryButtons
                : <p className='no-categories-message'>
                    Adicione mais tarefas para gerar categorias!
                </p>
                }

            </ul>
        </div>
    )
}