import axios, { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskData } from "../interfaces/TaskData";

const API_URL = import.meta.env.VITE_API_URL;

const deleteData = async (id: number) : AxiosPromise<TaskData> => {
    if (!id) {
        throw new Error('ID is required to delete a task');
    }
    const response = axios.delete(API_URL + `/tasks/${id}`);
    return response;
}


export function useTaskDataDelete(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task-data'] });
        }
    });

    return mutate;
}