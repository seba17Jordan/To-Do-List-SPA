import axios from './axios';

//Estas son las tipicas peticiones CRUD

export const getTasksRequest = () => axios.get('/tasks');//para obtener todas las tareas

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`); //Para obtener una sola tarea

export const createTaskRequest = (task) => axios.post('/tasks', task);//cuando un usuario me envie una tarea la envio a post, y el segundo parametro es para agregarlo a axios

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task); //en la tarea va incluido el id

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`); //recibo id de tarea a eliminar y hago peticion delete