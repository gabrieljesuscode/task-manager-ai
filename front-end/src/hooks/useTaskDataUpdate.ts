import axios, { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskData } from "../interfaces/TaskData";

const API_URL = import.meta.env.VITE_API_URL;

const putData = async (data: TaskData) : AxiosPromise<any> => {
    const response = axios.put(`${API_URL}/tasks`, data);
    return response;
}


export function useTaskDataUpdate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task-data'] });
        }
    });
    
    return mutate;
}