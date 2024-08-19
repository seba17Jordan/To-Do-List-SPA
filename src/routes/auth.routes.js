import { Router } from 'express';
import { login, logout, register, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post("/register", validateSchema(registerSchema), register); //cuando hace una peticion register hago que ejecute la funcion de register

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile); //antes de mostrar el profile se ejecuta la validación

export default router
//exporto porque las rutas se deben agregar a la app de express