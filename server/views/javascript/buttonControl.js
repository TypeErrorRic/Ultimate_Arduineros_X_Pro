//Control de animaciones
let counter = 0;

//Control Boton
const button = document.getElementById('button');
const baseDatos = document.getElementById('borrar');
const troll = document.getElementById('KILL');

button.addEventListener('click', regarPlanta);
borrar.addEventListener('click', borrarBaseDatos);
troll.addEventListener('click', function() {alert("No puedes matar a plantica >:(")});

function regarPlanta() {

    ++counter;
    if (counter < 2) {
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

function borrarBaseDatos (){
    fetch("https://plantica.onrender.com/api/elminar/datos")
        .then(res => res.json())
    alert("Se refrescó la base de datos")
}