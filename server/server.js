const express = require('express');
const app = express();
const path = require('path');

//Configuraciones
app.set('port', 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

//Rutas
app.use(require('./routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname + '/public')));

//Servidor escuchando
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'))
});