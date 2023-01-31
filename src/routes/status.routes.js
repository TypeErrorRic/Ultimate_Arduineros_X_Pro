import { Router } from "express";
import {
    get_status,
    elemento,
    ultimo_modificados,
    insertar_elemento,
    eliminar,
    create
} from '../controllers/status.controller.js'

const routes = Router();

routes.get('/', get_status)

routes.get('/:id', elemento)

//routes.get('/state/:id', ultimo_modificados)

routes.put('/', insertar_elemento)

routes.delete('/', eliminar)

routes.get('/create', create)

export default routes;