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
    setTimeout( async () => {
        const [result] = await connect.query('SELECT * FROM Estado WHERE id = ?', [change.indice_values() % change.size])
        if (result.length <= 0) return res.status(206).json({
            ID: 1,
            BOMBA: 0,
            HUMEDA: 0,
            TIEMPO: "2023-02-02T18:30:50.000Z",
            TEMPERATURA: 0,
            LUZ: 0,
            time_actual: "2023-02-2 13:34:17"
        })
        result[0].BOMBA = change.Estado_bomba_envio()
        result[0].time_actual = change.time_vivo()
        res.json(result);
    },  150);
}

export const insertar_elemento = async (req, res) => {
    let bomba = false;
    if(req.query.bomba != undefined) {
        if (parseInt(req.query.bomba) === 1) {
            bomba = true;
        }
    }
    if (change.contador_elements() === 0 && bomba)
    {
        change.status_bomba = bomba;
        change.Update_base();
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
    const [result] = await connect.query('TRUNCATE Estado');
    change.contador = 2;
    res.json(result);
}

