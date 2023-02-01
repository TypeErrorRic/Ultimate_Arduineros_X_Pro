import express from 'express'
import status from './routes/status.routes.js'
import {PORT} from './db.js'

const app = express();

app.use(express.json())
app.use('/api', status)

//Pagina principal:
app.use((req, res) => {
    res.status(200).send("Base de datos.")
});

app.listen(PORT);
console.log(`Está escuchando en el puerto ${PORT}`)