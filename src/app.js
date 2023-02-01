import express from 'express'
import status from './routes/status.routes.js'
import {PORT} from './db.js'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api', status)

//Pagina principal:
app.use((req, res) => {
    res.status(200).send("Base de datos.")
});

app.listen(PORT);
console.log(`Está escuchando en el puerto ${PORT}`)