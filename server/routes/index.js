const express = require('express');
const router = express.Router();
const path = require('path');

//Pagina principal
router.get('/', (req, res) => {
    res.render('index', { title: 'Mi planta' });
});

//Scripts
router.get('/javascript/buttonControl.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'javascript', 'buttonControl.js'));
});

router.get('/javascript/refresh.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'javascript', 'refresh.js'));
});

router.get('/javascript/animaciones.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'javascript', 'animaciones.js'));
});

module.exports = router;