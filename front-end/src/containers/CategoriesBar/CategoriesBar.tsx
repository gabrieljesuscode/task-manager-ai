import categoriesMistralAI from '../../APIs/categoriesMistralAI';
import type { TaskData } from '../../interfaces/TaskData';
import './Categories.css';
import { useEffect, useRef, useState } from 'react';
import { CategoryBtn } from './CategoryBtn';



interface CategoriesBarProps {
    data: TaskData[];
    visibleTasks: TaskData[];
    handleSelectedTitles: (taskTitles: string[]) => void;
}

// Type Guard para garantir que a resposta é um array de strings
const isArrayOfStrings = (arr: unknown): arr is string[]=> { 
    return Array.isArray(arr) && arr.every(item => typeof item === 'string');
}

    

export function CategoriesBar ({data, visibleTasks, handleSelectedTitles}: CategoriesBarProps) {

    const [categories, setCategories] = useState<[string, string[]][]>([]);
    const lastTitlesRef = useRef('');

    useEffect(() => {


        const categoriesList = async () => {
            const response = await categoriesMistralAI(data); // Vem como um objeto de chaves e valor
            
            if(!response) {
                return;
            }

            // Transforma em um array de tuplas [categoria, tarefas] e filtra apenas as que tem um array de strings como tarefas
            const categoriesArray = Object.entries(response).filter(([, tasks]) => isArrayOfStrings(tasks));

            setCategories(categoriesArray); // 
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