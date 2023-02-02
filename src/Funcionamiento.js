import { connect } from './db.js'
import fetch from 'cross-fetch';

let date = new Date();
const url = "https://api.openweathermap.org/data/2.5/weather?"
const apy_key = "6484f72d4341c29100bed5706514747c"
const lugar = "lat=3.45&lon=-76.53"
const unidades = "units=metric"

let indice = 1;

export const hum_temp =
{
    temperatura: 234.5,
    humedad: 0,
    Now: 0,
    contador: 0,
    disminucion: false,
}

//Funcion para modificar los valroes de la temperatura y humedad
const obtencion_tem_hum = async (tiempo, value, inicio) => {
    if (value && hum_temp.contador == 0) 
    {
        hum_temp.contador = 10;
    }
    if (Math.abs(tiempo - hum_temp.Now) >= 10 || inicio) 
    {
        console.log("-----------------------");
        hum_temp.Now = tiempo;
        try
        {
            await fetch(`${url}${lugar}&appid=${apy_key}&${unidades}`).
                then(res => res.json()).
                then(data => {
                    hum_temp.temperatura = data.main.temp
                    hum_temp.humedad = data.main.humidity
                    if (hum_temp.contador != 0) {
                        hum_temp.temperatura = data.main.temp - ((10 - hum_temp.contador) / 10);
                        hum_temp.temperatura = hum_temp.temperatura.toFixed(2)
                        hum_temp.humedad = data.main.humidity + (10 - hum_temp.contador);
                        hum_temp.humedad = hum_temp.humedad.toFixed(2)
                        if (hum_temp.contador > 1 && !hum_temp.disminucion) {
                            hum_temp.contador -= 1;
                            if (hum_temp.contador == 1)
                                hum_temp.disminucion = true;
                        }
                        else if (hum_temp.contador == 1 || hum_temp.disminucion) {
                            hum_temp.contador += 1;
                            if (hum_temp.contador == 10) {
                                hum_temp.disminucion = false;
                                hum_temp.contador = 0;
                            }
                        }
                    }
                })
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

//Objecto literal con la información y los metodos para realizar los calculos.
export const Funciones = {
    indice: 1,
    size: 31,
    long_time: [
        date.getMonth(),
        date.getDate(),
        date.getFullYear()
    ],
    short_time: [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ],
    Date: "",
    change: true,
    estatus_day: '',
    //Lista de elementos que son entregados a la Base de datos
    values: {
        bomba: false,
        tiempo: "2003-03-25 11:05:17",
        luz: 55.5
    },
    inicio: true,
    Update: function () {
        date = new Date();
        //Tiempo largo:
        this.long_time[0] = (date.getMonth() + 1)
        this.long_time[1] = date.getDate()
        this.long_time[2] = date.getFullYear()
        //Short tiempo:
        this.estatus_day = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).substring(2)
        if(this.estatus_day.length > 2){
            this.estatus_day = this.estatus_day.substring(1);
        }
        this.short_time[0] = date.getHours();
        this.short_time[1] = date.getMinutes()
        this.short_time[2] = date.getSeconds()
        //temp y hum:
        obtencion_tem_hum(this.short_time[2], false, this.inicio)
    },
    Fecha: function () {
        if (this.long_time[0] < 10)
            this.Date = `${this.long_time[2]}-0${this.long_time[0]}-${this.long_time[1]}`
        else
            this.Date = `${this.long_time[2]}-${this.long_time[0]}-${this.long_time[1]}`
        this.Date = this.Date + " " + `${this.short_time[0]}:${this.short_time[1]}:${this.short_time[2]}`
        this.values.tiempo = this.Date;
        return this.values.tiempo;
    },
    cambiar_luz: function () {
        //Actualizar recien empieza:
        if (this.inicio && this.estatus_day == 'AM' && this.short_time[0] >= 6) 
        {
            this.values.luz = (100 * (this.short_time[1] + (this.short_time[0] * 60) - 360)) / 360;
            this.values.luz = this.values.luz.toFixed(2);
            this.inicio = false;
        }
        else if (this.inicio && this.estatus_day == 'PM' && this.short_time[0] < 6) 
        {
            this.values.luz = 100 - (100 * (this.short_time[1] + (this.short_time[0] * 60))) / 360;
            this.values.luz = this.values.luz.toFixed(2);
            this.inicio = false;
        }
        else{
            this.inicio = false;  
        }
        //Actualizar Fecha:
        if (this.change && this.estatus_day == 'AM' && this.short_time[0] >= 6) {
            this.change = false;
            this.values.luz = (100 * (this.short_time[1] + (this.short_time[0] * 60) - 360)) / 720;
            this.values.luz = this.values.luz.toFixed(2);
        }
        else if (this.change && this.estatus_day == 'PM' && this.short_time[0] < 6) 
        {
            this.change = false;
            this.values.luz = 100 - (100 * (this.short_time[1] + (this.short_time[0] * 60))) / 720;
            this.values.luz = this.values.luz.toFixed(2);
        }
        else if (indice % 2 === 0) {
            if (this.short_time[0] < 6 && this.estatus_day == 'AM')
            {
                this.values.luz = 0;
            }
            else if (this.estatus_day == 'PM' && this.short_time[0] >= 6)
            {
                this.values.luz = 0;
            }
            else
            {
                this.change = true;
            }
        }
        return this.values.luz;
    },
    Estado_boton: function (bomba) {
        if (bomba) {
            this.values.bomba = true
            obtencion_tem_hum(this.short_time[2], true, false)
        }
        if (this.values.bomba) {
            if (hum_temp.contador === 5)
            {
                this.values.bomba = false;
            }
        }
        return this.values.bomba
    }
};

//Sistema de comunicacion y actualizacion de datos.
const base_datos = async (bomba, humedad, fecha, temperatura, luz, size) => 
{
    const [rows] = await connect.query('SELECT * FROM Estado');
    if (rows.length < size - 1) {
        const [result] = await connect.query('INSERT INTO Estado (BOMBA, HUMEDAD, TIEMPO, TEMPERATURA, LUZ) VALUES (?, ?, ?, ?, ?)',
            [bomba, humedad, fecha, temperatura, luz]);
        indice = result.insertId;
    }
    else {
        if (indice == size) indice = 1;
        await connect.query('UPDATE Estado SET BOMBA = ?, HUMEDAD = ?, TIEMPO = ?, TEMPERATURA = ?, LUZ= ? WHERE ID = ?',
            [bomba, humedad, fecha, temperatura, parseFloat(luz), indice % size])
        indice += 1;
    }
}

//Constructor de la clase de elementos:
function Update_base_datos()
{
    this.status_bomba = false;
    this.contador = 0;
    this.size = 11;
    this.Update_base = function()
    {
        Funciones.Update()
        console.log(`${Funciones.Estado_boton(this.status_bomba)} / ${hum_temp.humedad} / ${Funciones.Fecha()} / ${hum_temp.temperatura} / ${Funciones.cambiar_luz()}%`);
        if(this.status_bomba)
        {
            base_datos(
                Funciones.Estado_boton(this.status_bomba),
                hum_temp.humedad,
                Funciones.Fecha(),
                hum_temp.temperatura,
                Funciones.cambiar_luz(),
                this.size)
            this.status_bomba = false;
        }
        this.contador += 1;
        if(this.contador >= 2)
        {
            base_datos(
                Funciones.Estado_boton(this.status_bomba), 
                hum_temp.humedad, 
                Funciones.Fecha(),
                hum_temp.temperatura, 
                Funciones.cambiar_luz(),
                this.size)
            this.contador = 0;
        }
    }
    this.contador_elements = function()
    {
        return hum_temp.contador;
    }
    this.indice_values = function()
    {
        if(indice == 11)
        {
            indice = 1;
        }
        return indice;
    }
}

export const change = new Update_base_datos();


