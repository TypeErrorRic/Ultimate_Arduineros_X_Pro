import { connect } from '../db'
import { Funciones, 
        hum_temp,
} from '../Funcionamiento.js'

let indice = 1;
const size = 31;

export const get_status = async (req, res) => {
    const [result] = await connect.query('SELECT * FROM Estado')
    res.json(result)
}

export const elemento = async (req, res) =>
{
    const [rows] = await connect.query('SELECT * FROM Estado WHERE ID = ?', [req.params.id])
    if (rows.length <= 0) 
        return res.status(404).json({
            message: "Elemento no encontrado"
        })
    else 
        return res.status(200).json(rows[0]);
}

export const ultimo_modificados = async (req, res) =>
{
    const [result] = await connect.query('SELECT * FROM Estado WHERE id = ?', [indice%size])
    if(result.length <= 0) return res.status(404).json({
        message: 'Elemento no encontrado'
    })
    else indice += 1;
    res.json(result);
}

export const insertar_elemento = async (req, res) => {
    console.log(req.body)
    const {bomba} = req.body;
    const [rows] = await connect.query('SELECT * FROM Estado');
    console.log(rows.length)
    if(rows.length < size-1)
    {
        const [result] = await connect.query('INSERT INTO estado (BOMBA, HUMEDAD, TIEMPO, TEMPERATURA, LUZ) VALUES (?, ?, ?, ?, ?)',
            [Funciones.Estado_boton(bomba.bomba), hum_temp.humedad, Funciones.Fecha(), hum_temp.temperatura, Funciones.cambiar_luz()]);
        res.status(206).send({
            estado: "Agregado",
            id: result.insertId,
            boba: Funciones.values.bomba,
            humedad: hum_temp.humedad,
            tiempo: Funciones.Fecha(),
            temperatura: hum_temp.temperatura,
            luz: `${Funciones.cambiar_luz()}%`
        })
    }
    else
    {
        if(indice == size) indice = 1;
        const [result] = await connect.query('UPDATE Estado SET BOMBA = ?, HUMEDAD = ?, TIEMPO = ?, TEMPERATURA, LUZ= ? WHERE ID = ?', 
            [Funciones.Estado_boton(bomba.bomba), hum_temp.humedad, Funciones.Fecha(), hum_temp.temperatura, Funciones.cambiar_luz(), indice%size])
        indice++
        res.status(202).json(result[0])
    }
}

export const eliminar = async (req, res) => {
    const [result] = await connect.query('DELETE FROM Estado');
}

export const create = async (req, res) => {
    const result = await connect.query("INSERT INTO estado (BOMBA, HUMEDAD, TIEMPO, TEMPERATURA, LUZ) VALUES (FALSE, 23.5, '2003-03-25 11:05:17', 234.5, 55.5)")
    res.json(result);
}
