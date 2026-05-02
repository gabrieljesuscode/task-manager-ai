import { useQuery } from '@tanstack/react-query';
import type { TaskData } from '../interfaces/TaskData';
import type { AxiosPromise } from 'axios';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchData = async () : AxiosPromise<TaskData[]> => {
    const response = axios.get(API_URL + '/tarefas');
    return response;
}


export function useTaskData() {
    const query = useQuery({
        queryKey: ['task-data'],
        queryFn: fetchData,
        retry: 2
    });

    
    return {
        ...query,
        data: query.data?.data || []
    }
}