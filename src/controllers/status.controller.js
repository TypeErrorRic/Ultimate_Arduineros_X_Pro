import { connect } from '../db.js'
import { change } from '../Funcionamiento.js'

export const get_status = async (req, res) => {
    const [result] = await connect.query('SELECT * FROM Estado')
    res.json(result)
}

export const elemento = async (req, res) =>
{
    const [result] = await connect.query('SELECT * FROM Estado')
    if (result.length < req.params.id) 
        return res.status(404).json({
            message: "Elemento no encontrado"
        })
    else 
    {
        const [rows] = await connect.query('SELECT * FROM Estado WHERE ID = ?', [req.params.id])
        res.status(200).json(rows[0]);
    }
}

export const ultimo_modificados = async (req, res) =>
{
    change.Update_base();
    const [result] = await connect.query('SELECT * FROM Estado WHERE id = ?', [change.indice_values()%change.size])
    if(result.length <= 0) return res.status(404).json({
        message: 'Elemento no encontrado'
    })
    res.json(result);
}

export const insertar_elemento = async (req, res) => {
    const {bomba} = req.body;
    if(change.contador_elements() === 0)
    {
        change.status_bomba = bomba;
        res.status(200).json({
            message: "Cambiado",
        })
    }
    else
    {
        res.status(200).json({
            message: "No Cambiado",
        })
    }
}

export const eliminar = async (req, res) => {
    const [result] = await connect.query('DELETE FROM Estado');
}

