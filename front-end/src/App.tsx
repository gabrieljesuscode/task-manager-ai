import { useState } from 'react';
import './App.css'
import { AddTaskContainer } from './containers/AddTaskContainer/AddTaskContainer'
import { CategoriesBar } from './containers/CategoriesBar/CategoriesBar';
import { DeleteAllButton } from './containers/DeleteAllButton/DeleteAllButton';
import { TaskCard } from './containers/TaskCard/TaskCard';
import { useTaskData } from './hooks/useTaskData'

function App() {
  const { data } = useTaskData();
  const [selectedTitles, setSelectedTitles] = useState<string[] | null>(null);
  
 
  const visibleTasks = selectedTitles === null
  ? data
  : data.filter(task => selectedTitles.includes(task.title));

  
  // Handler que será passado para os botões de categoria para atualizar os títulos selecionados
  const handleSelectedTitles = (taskTitles: string[] | null)=> {

    if (selectedTitles && selectedTitles.every(title => taskTitles?.includes(title))) {
        setSelectedTitles(null); // Desmarca se já está selecionado
    } else {

     setSelectedTitles(taskTitles);
    }
  }

  return (
    <div className='app-container'>
      <h1 className='main-title'>Gerenciador de Tarefas com IA</h1>
      <div className='grid-container'>

        <AddTaskContainer />
        <div className="grid-tasks">

          <CategoriesBar data={data} handleSelectedTitles={handleSelectedTitles} visibleTasks={visibleTasks}/>

          <div className='tasks-container'>
            {visibleTasks.length > 0 ? 
              visibleTasks.map(item => <TaskCard
                key={item.id} 
                id={item.id ? item.id : 0} 
                title={item.title} 
                description={item.description}
                isCompleted={item.isCompleted ? item.isCompleted : false}
              />
              ) 
              : <p className='no-tasks-message'>Nenhuma tarefa encontrada. Adicione uma nova tarefa para começar!</p>
            }
          </div>
        </div>
      </div>
          <div className='delete-container'>
            <DeleteAllButton tasksData={data} />
          </div>
    </div>
  )
}

export default App
