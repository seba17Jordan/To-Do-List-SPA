import { useTasks } from "../context/TasksContext";
import { Link } from 'react-router-dom';

//Esto es solo para formatear bien la fechaimport dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dayjs from "dayjs";
dayjs.extend(utc);


function TaskCard({ task }) { //recibo la tarea como un prop

    const { deleteTask } = useTasks()//usamos el contexto de tareas

    return (
        <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className=" flex justify-between">
                <h1 className=" text-2xl font-bold">{task.title}</h1>
                <div className=" flex gap-x-2 items-center">
                    <button 
                    className=" bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        deleteTask(task._id);
                    }}>delete</button>
                    <Link to={`/tasks/${task._id}`}
                    className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >edit</Link>
                </div>
            </header>
            <p className=" text-slate-300">{task.description}</p>
            <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
        </div>
    )
}

export default TaskCard;