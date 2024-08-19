import { useForm } from 'react-hook-form';
import { date } from 'zod';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

//Esto es solo para formatear bien la fecha
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskFormPage() {

    const { handleSubmit, register, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks(); //Me traigo las tareas y las funciones que me interesan
    const navigate = useNavigate();
    const params = useParams(); //Obtiene datos de la URL

    useEffect(() => {
        async function loadTask() { //Precarga los datos en el formulario si estamos editando
            if (params.id) {
                const task = await getTask(params.id);
                console.log(task);
                setValue('title', task.title);
                setValue('description', task.description);
                setValue('date', dayjs.utc(task.date).format("YYYY-MM-DD"));
            }
        }
        loadTask();
    }, []);

    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format() //si hay fecha la formateo, sino mando la actual    
        };

        if (params.id) {
            updateTask(params.id, dataValid);
        } else {
            createTask(dataValid);
        }
        navigate('/tasks');
    });

    return (
        <div className=' flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className=' bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">title</label>
                    <input type="text"
                        placeholder="Title"
                        {...register('title')}
                        autoFocus
                        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <label htmlFor="description">description</label>
                    <textarea rows="3"
                        placeholder="Description"
                        {...register('description')}
                        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>

                    <label htmlFor="date">Date</label>
                    <input type="date"
                        {...register('date')}
                        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <button className=' bg-indigo-500 px-3 py-2 rounded-md'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage;