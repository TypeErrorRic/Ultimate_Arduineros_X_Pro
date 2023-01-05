const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {title:'Mi planta'});
});

module.exports = router;