import express from 'express'
import status from './routes/status.routes.js'
import {PORT} from './db'

const app = express();

app.use(express.json())
app.use('/api', status)

app.listen(PORT);
console.log(`Está escuchando en el puerto ${PORT}`)