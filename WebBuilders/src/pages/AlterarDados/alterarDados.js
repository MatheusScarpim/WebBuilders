const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const con = require('../../Banco/MySQL/conexaoMysql');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/alterarUsuario', (req, res) => {
    res.send(req.session.login)
});
module.exports = router;