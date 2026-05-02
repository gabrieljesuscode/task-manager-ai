import axios, { type AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskData } from "../interfaces/TaskData";

const API_URL = import.meta.env.VITE_API_URL;

const postData = async (data: TaskData) : AxiosPromise<any> => {
    const response = axios.post(API_URL + '/tarefas', data);
    return response;
}


export function useTaskDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['task-data']);
        }
    });

    return mutate;
}