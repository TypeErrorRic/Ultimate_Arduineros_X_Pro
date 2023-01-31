const apy_key = "6484f72d4341c29100bed5706514747c"
const lugar = "lat=44.34&lon=10.99"
const unidades = "units=metric"

const clima = async () => {
    try {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?${lugar}&appid=${apy_key}&${unidades}`).
            then(res => res.json()).then(data => {
                return [data.main.temp, data.main.humidity]
            });
    }
    catch(error) {
        console.log(error);
    }
}

clima().then(res => {return res}).catch(error => console.log(error));