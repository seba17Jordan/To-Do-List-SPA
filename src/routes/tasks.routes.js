import { Router } from 'express'; //importo enrutador
import { authRequired } from '../middlewares/validateToken.js'; //importo ya que debe estar protegido
import { getTasks, getTask, updateTask, deleteTask, createTask } from '../controllers/tasks.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router()//ejecuto enrutador

router.get("/tasks", authRequired, getTasks); //Obtener

router.get("/tasks/:id", authRequired, getTask); //Obtener uno solo

router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask); //Crear, primero llega URL, luego se valida que el usuario esté autenticado, y luego se valida si lo que está creando es válido

router.delete("/tasks/:id", authRequired, deleteTask); //Eliminar uno solo

router.put("/tasks/:id", authRequired, updateTask); //Actualizar uno solo

export default router;//exporto enrutador