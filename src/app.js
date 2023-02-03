//Elementos importados:
import express from 'express'
import status from './routes/status.routes.js'
import { PORT, connect } from './db.js'
import cors from 'cors'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

//Express:
const app = express();

//Middlewares:
app.use(cors());
app.use(express.json())

//Routes:
app.use('/api', status)

//Elementos para la presentación de la base de datos:
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')))

//Pagina principal:
app.get('/', async (req, res) => {
    const [result] = await connect.query('SELECT * FROM Estado')
    setTimeout(() => {
        res.render('tabla', {
            base: result,
        })
    }, 200)
});

//Pagina de informacion:
app.get('/about', async (req, res) => {
    res.render('about')
});

//Pagina por default
app.use((req, res) => {
    res.status(404).render("No_found")
});

//Establecer puerto de escucha.
app.listen(PORT);
console.log(`Está escuchando en el puerto ${PORT}`)