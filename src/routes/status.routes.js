import { Router } from "express";
import {
    get_status,
    elemento,
    ultimo_modificados,
    insertar_elemento,
    eliminar,
    eliminar2
} from '../controllers/status.controller.js'

const routes = Router();

routes.get('/', get_status)

routes.get('/element', elemento)

routes.get('/state/num', ultimo_modificados)

routes.get('/agua/bomba', insertar_elemento)

routes.get('/eliminar/datos', eliminar)

routes.get('/eliminar/datos/estaticos', eliminar2)

export default routes;