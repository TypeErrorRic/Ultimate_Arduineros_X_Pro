import { connect } from '../db.js'
import { change } from '../Funcionamiento.js'

export const get_status = async (req, res) => {
    const [result] = await connect.query('SELECT * FROM Estado')
    res.json(result)
}

export const elemento = async (req, res) => {
    const [result] = await connect.query('SELECT * FROM Estado')
    let element;
    try {
        element = parseInt(req.query.q);
    } catch (e) {
        return res.status(404).send("Valor no valido. Ingrese otro")
    }
    if (result.length < element){
        return res.status(404).send("Número no permitido. Ingrese otro valor.")
    }
    else {
        const [rows] = await connect.query('SELECT * FROM Estado WHERE ID = ?', [element])
        setTimeout(() => {
            res.render('individual', {
                base: rows[0],
            })
        }, 200)
    }
}


export const ultimo_modificados = async (req, res) => {
    change.Update_base();
    setTimeout(async () => {
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
    }, 250);
}

export const insertar_elemento = async (req, res) => {
    let bomba = false;
    if (req.query.bomba != undefined) {
        if (parseInt(req.query.bomba) === 1) {
            bomba = true;
        }
    }
    if (change.contador_elements() === 0 && bomba) {
        change.status_bomba = bomba;
        change.Update_base();
        res.status(200).json({
            message: "Cambiado",
        })
    }
    else {
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

export const eliminar2 = async (req, res) => {
    await connect.query('TRUNCATE Estado');
    const [result] = await connect.query('SELECT * FROM Estado')
    setTimeout(() => {
        res.render('tabla', {
            base: result,
        })
    }, 200)
}
