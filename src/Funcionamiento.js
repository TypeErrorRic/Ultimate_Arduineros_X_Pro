let date = new Date();
let actual = 0;
const url = "https://api.openweathermap.org/data/2.5/weather?"
const apy_key = "6484f72d4341c29100bed5706514747c"
const lugar = "lat=44.34&lon=10.99"
const unidades = "units=metric"
let contador=0;
let disminucion=false;

export const hum_temp = 
{
    temperatura: 234.5,
    humedad: 0,
}

//Funcion para modificar los valroes de la temperatura y humedad
const obtencion_tem_hum = async (tiempo, value) => {
    if(value != 0)
        contador = value;
    if(tiempo - actual != 0)
    {
        await fetch(`${url}${lugar}&appid=${apy_key}&${unidades}`).
        then(res => res.json()).
            then(data => {
                hum_temp.temperatura = data.main.temp - contador;
                hum_temp.humedad = data.main.humidity + contador;
                actual = tiempo;
                if(contador != 0)
                {
                    if (contador <= value && !disminucion) {
                        contador++;
                        disminucion = true;
                    }
                    else if (contador > 0 && disminucion)
                        contador-- 
                }
                else
                    disminucion = false;
            })
    }
}

//Objecto literal con la información y los metodos para realizar los calculos.
export const Funciones  = {
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
    Update: function()
    {
        date = new Date();
        //Tiempo largo:
        this.long_time[0] = (date.getMonth()+1)
        this.long_time[1] = date.getDate()
        this.long_time[2] = date.getFullYear()
        //Short tiempo:
        this.estatus_day = date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).substring(2)
        this.short_time[0] = parseInt(date.toLocaleString('en-US', { hour: 'numeric', hour12: true })[0])
        this.short_time[1] = date.getMinutes()
        this.short_time[2] = date.getSeconds()
        //temp y hum:
        obtencion_tem_hum(this.short_time[1],0)
    },
    Fecha: function()
    {
        if(this.long_time[0] < 10)
            this.Date = `${this.long_time[2]}-0${this.long_time[0]}-${this.long_time[1]}`
        else
            this.Date = `${this.long_time[2]}-${this.long_time[0]}-${this.long_time[1]}`
        this.Date = this.Date + " "+ `${this.short_time[0]}:${this.short_time[1]}:${this.short_time[2]}`
        this.values.tiempo = this.Date;
        return this.values.tiempo;
    },
    cambiar_luz: function()
    {
        this.Update();
        if (this.inicio && this.estatus_day == 'AM' && this.short_time[0] >= 7)
        {
            this.values.luz = (100 * (this.short_time[1] + (this.short_time[0] * 60) - 420)) / 720;
            this.values.luz = this.values.luz.toFixed(2);
            this.incio = false;
        }
        else if (this.inicio && this.estatus_day == 'PM' && this.short_time[0] <= 7)
        {
            this.values.luz = 100 - (100 * (this.short_time[1] + (this.short_time[0] * 60))) / 720;
            this.values.luz = this.values.luz.toFixed(2);
            this.incio = false;
        }
        else if (this.inicio)
            this.values.luz == 0;
        if(this.short_time[1] % 10 === 0 && this.change && this.estatus_day == 'AM' && this.short_time[0] >= 7)
        {
            this.change = false;
            this.values.luz = (100 * (this.short_time[1] + (this.short_time[0] * 60) - 420)) / 720;
            this.values.luz = this.values.luz.toFixed(2);
        }
        else if (this.short_time[1] % 10 === 0 && this.change && this.estatus_day == 'PM' && this.short_time[0] <= 7)
        {
            this.change = false;
            this.values.luz = 100 - (100 * (this.short_time[1] + (this.short_time[0] * 60))) / 720;
            this.values.luz = this.values.luz.toFixed(2);
        }
        else if (this.short_time[1] % 10 != 0)
        {
            this.change = true;
        }
        return this.values.luz;
    },
    Estado_boton: function(bomba)
    {
        this.Update()
        if(bomba)
        {
            this.values.bomba = true
        }
        if (this.values.bomba)
        {
            if(contador == 2)
                this.values.bomba = false;
        }
        return this.values.bomba
    }
};

setInterval(() => {
    console.log(`${Funciones.Estado_boton(false)} / ${hum_temp.humedad} / ${Funciones.Fecha()} / ${hum_temp.temperatura} / ${Funciones.cambiar_luz()}%`);
}, 1000);


