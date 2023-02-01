import { Router } from "express";
import {
    get_status,
    elemento,
    ultimo_modificados,
    insertar_elemento,
    eliminar,
} from '../controllers/status.controller.js'

const routes = Router();

routes.get('/', get_status)

routes.get('/:id', elemento)

routes.get('/state/num', ultimo_modificados)

routes.post('/', insertar_elemento)

routes.delete('/', eliminar)

export default routes;