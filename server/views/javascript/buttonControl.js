//Control Boton
const button = document.getElementById('button');
const baseDatos = document.getElementById('borrar');
const troll = document.getElementById('KILL');
let counter = 0;

//Esperar a un evento
button.addEventListener('click', regarPlanta);
borrar.addEventListener('click', borrarBaseDatos);
troll.addEventListener('click', function() {alert("No puedes matar a plantica >:(")});

//Regar la planta
function regarPlanta() {

    ++counter;
    //Control de una sola pulsacion
    if (counter < 2) {
        //Guardar en la base de datos bomba encendida (metodo get)
        fetch("https://plantica.onrender.com/api/agua/bomba?bomba=1")
            .then(response => response.json())
            .then(data => {
                if (data.message == "Cambiado"){
                    console.log(data.message)
                    document.getElementById('regar').style.display = 'block';
                    setTimeout(function () {
                        document.getElementById('regar').style.display = 'none';
                        counter = 0;
                    }, 60000);
                }else{
                    console.log(data.message)
                    alert('Por favor espera un tiempo antes de volver a regar, vas a matar a plantica :(')
                    counter = 0;
                }
            })
    } else;

    if (counter > 1) {
        alert('Por favor espera a que termine de regar');
    };
}

//Refrescar base de datos
function borrarBaseDatos (){
    fetch("https://plantica.onrender.com/api/eliminar/datos")
        .then(res => res.json())
    alert("Se refrescó la base de datos")
}