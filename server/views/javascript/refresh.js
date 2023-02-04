// Variables
const temp = document.getElementById('temp');
const hum = document.getElementById('hum');
const lu = document.getElementById('lu');
const bomb = document.getElementById('bomb');
const tiempo = document.getElementById('tiempo');
const url = "https://plantica.onrender.com/api/state/num"

//Informacion inicial al ingresar a la pagina
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var tiemp2 = new Date(`${data[0].time_actual}`);
        if(data[0].BOMBA == 0){
            bomb.innerHTML = "Apagado";
        } else { bomb.innerHTML = "Encendido"};
        temp.innerHTML = `${data[0].TEMPERATURA}`;
        hum.innerHTML = `${data[0].HUMEDAD}`;
        lu.innerHTML = `${data[0].LUZ}`;
        tiempo.innerHTML = `<p>${tiemp2}<p>`;
    })

//Cada 2 segundo realiza una peticion a la Api y actualiza la informacion en pantalla
window.setInterval(function () {
    
    fetch(url)
        .then(response => response.json())
        .then(data => dataPlanta(data))

    function dataPlanta(data) {
        console.log(data)
        var tiemp2 = new Date(`${data[0].time_actual}`);
        if(data[0].BOMBA == 0){
            bomb.innerHTML = "Apagado";
        } else { bomb.innerHTML = "Encendido"};
        temp.innerHTML = `${data[0].TEMPERATURA}`;
        hum.innerHTML = `${data[0].HUMEDAD}`;
        lu.innerHTML = `${data[0].LUZ}`;
        tiempo.innerHTML = `<p>${tiemp2}<p>`;
    }

}, 2000);