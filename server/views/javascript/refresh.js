const temp = document.getElementById('temp');
const hum = document.getElementById('hum');
const lu = document.getElementById('lu');
const bomb = document.getElementById('bomb');
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const url1 = "https://plantica.onrender.com/api"

const funcioon = async () => {
    await fetch(url).then(res => res.json()).then(data => console.log(data));
}
funcioon();

window.setInterval(function () {
    temp.innerHTML = "Cambio";
}, 10000);