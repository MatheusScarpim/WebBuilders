const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const con = require('../../Banco/MySQL/conexaoMysql');

router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/emprestimo', (req, res) => {
    res.render(path.join(__dirname, 'index.ejs'), { names: req.session.names });
});

router.get('/dataset', (req, res) => {
    con.query("SELECT email FROM customers", (err, results, fields) => {
        if (err) {
            console.error('Error querying customer names:', err);
            res.status(500).json({ error: 'Error querying customer names' });
            return;
        }

        const customerNames = results.map(result => result.email);

        res.json(customerNames);
    });
});



module.exports = router;