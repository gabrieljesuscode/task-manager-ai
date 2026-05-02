import { useState } from "react";
import "./AddTaskContainer.css";
import type { TaskData } from "../../interfaces/TaskData";
import { useTaskDataMutate } from "../../hooks/useTaskDataMutate";


interface InputProps {
  label: string,
  value: string,
  updateValue(value: string): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={e => updateValue(e.target.value)}></input>
    </>
  );
}


export function AddTaskContainer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate } = useTaskDataMutate();
  
  const submit = () => {
      
      if (!title.trim()) {
          return;
      }

      const taskData: TaskData = {
          title: title.trim(),
          description: description.trim()
      }

      mutate(taskData);


      setTitle("");
      setDescription("");
  };  

  return (
    <div className="add-container">
      <h2>Adicione uma nova tarefa</h2>
      <form className="form-container">
        <Input label="Título" value={title} updateValue={setTitle} />
        <Input label="Descrição (Opcional)" value={description} updateValue={setDescription} />
      </form>
      <button className="btn-secondary" onClick={submit}>
        Adicionar
      </button>
    </div>
  );
}