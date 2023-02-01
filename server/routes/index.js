const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render('index', {title:'Mi planta'});
});

//Scripts
router.get('/javascript/visualControl.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'javascript', 'visualControl.js'));
});

router.get('/javascript/refresh.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'javascript', 'refresh.js'));
});

module.exports = router;