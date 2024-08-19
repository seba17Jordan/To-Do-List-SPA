import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks';

const TaskContext = createContext();

//Esto es el hook, si existe contexto lo retorno, sino lanzo error
export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be within a TaskProvider");
    }
    return context;
}

//esta funcion va a ser el contenedor de todos los componentes que quieran acceder (como el auth provider de las rutas protegidas)
export function TaskProvider({children}) {

    const [tasks, setTasks] = useState([]); //Almacenamos las task como una lista

    //Se encargara de hacer la peticion al backend para obtener las tareas
    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);    
        } catch (error) {
            console.log(error);
        }

    };

    //Esta funcion se encargara de mandar las tareas al backend para crear (recibe tarea y hace peticion asincrona)
    const createTask = async (task) => {
        const res = await createTaskRequest(task); //paso la tarea a funcion CRUD
        console.log(res);
    };

    const deleteTask = async (id) => {
         try {
            const res = await deleteTaskRequest(id); //esto manda al back
            if (res.status === 204) setTasks(tasks.filter(task => task._id != id)) //creo un arreglo nuevo sin la que acabo de eliminar, esto es de front para que actualice
         } catch (error) {
            console.log(error);
         }
    };

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;    
        } catch (error) {
            console.log(error);
        }
    };

    //id de la tarea a actualizar y valores que quiero ponerle, esto para actualizar
    const updateTask = async (id, task) => { 
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.log(error);
        }
    };

    //Lo que importo en el value aca abajo es a lo que quiero poder acceder de otras paginas, como las tareas o la funcion para agregar tareas, asi le puedo mandar parametros
    return (
        <TaskContext.Provider value={{tasks, createTask, getTasks, deleteTask, getTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    );
}