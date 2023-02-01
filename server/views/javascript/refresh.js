const temp = document.getElementById('temp');
const hum = document.getElementById('hum');
const lu = document.getElementById('lu');
const bomb = document.getElementById('bomb');
const url = "https://plantica.onrender.com/api/state/num"

let temp1 = ''
let hum1 = ''
let lu1 = ''
let bomb1 = ''

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        temp1 = `${data[0].TEMPERATURA}`
        hum1 = `${data[0].HUMEDAD}`
        lu1 = `${data[0].LUZ}`
        bomb1 = `${data[0].BOMBA}`
        temp.innerHTML = temp1;
        hum.innerHTML = hum1;
        lu.innerHTML = lu1;
        bomb.innerHTML = bomb1;
    })

window.setInterval(function () {
    
    fetch(url)
        .then(response => response.json())
        .then(data => dataPlanta(data))

    function dataPlanta(data) {
        console.log(data)
        temp1 = `${data[0].TEMPERATURA}`
        hum1 = `${data[0].HUMEDAD}`
        lu1 = `${data[0].LUZ}`
        bomb1 = `${data[0].BOMBA}`
        temp.innerHTML = temp1;
        hum.innerHTML = hum1;
        lu.innerHTML = lu1;
        bomb.innerHTML = bomb1;
    }

}, 3000);