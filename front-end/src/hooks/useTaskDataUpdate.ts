import axios, { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskData } from "../interfaces/TaskData";

const API_URL = import.meta.env.VITE_API_URL;

const putData = async (data: TaskData) : AxiosPromise<any> => {
    const response = axios.patch(`${API_URL}/tarefas/${data.id}`, data);
    return response;
}


export function useTaskDataUpdate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['task-data']);
        }
    });
    
    return mutate;
}