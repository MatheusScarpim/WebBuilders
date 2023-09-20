const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const con = require('../../Banco/MySQL/conexaoMysql');
const checkCargo = require('../Cargo/cargo');

router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/buscar', checkCargo("A"), (req, res) => {
    res.render(path.join(__dirname, 'index.ejs'), {
        names: req.session.names
    });
});

router.post('/buscar', checkCargo("A"), (req, res) => {
    let queryBanco = `SELECT * FROM customers c 
    inner join actions ac on(ac.id_customer = c.id_customer)
     inner join book b on(b.id_book = ac.id_book) 
     where ac.status <> 'F' and `;

    const emailbody = req.body.email;
    const namesbody = req.body.names;
    console.log(emailbody)
    console.log(namesbody)

    console.log(emailbody)
    if (emailbody != undefined && emailbody != "") {
        queryBanco = `${queryBanco} email = '${emailbody}'`;
    } else if (namesbody != undefined && namesbody != "") {
        queryBanco = `${queryBanco} names = '${namesbody}'`;
    } else {
        res.redirect("/erro");
        return;
    }
    console.log(queryBanco)

    con.query(queryBanco, (err, values) => {
        if (err) {
            console.error('Erro na busca', err);
            res.status(500).send('Erro na busca');
            return;
        }

        if (values.length === 0) {
            res.redirect("/erro");
        } else {
            const dados = values;
            res.render(path.join(__dirname + "/Busca", 'index.ejs'), {
                dados,
                names: req.session.names
            });
        }
    });
});

router.get('/finalizar', checkCargo("A"), (req, res) => {
    let id = req.query.id_action;
    console.log(id)
    con.query("update actions ac set ac.status = 'F' WHERE ac.id_action = ?", id, (err, results, fields) => {
        if (err) {
            console.error('Finalizado', err);
            res.status(500).send('Error inserting book');
            return;
        }
    });
    con.query("insert into historic values(?,DEFAULT,'F')", id, (err, results, fields) => {
        if (err) {
            console.error('Finalizado no historico', err);
            res.status(500).send('Error inserting book');
            return;
        }
        res.status(200).redirect('/buscar');
    });
});

router.get('/cancelar', checkCargo("A"), (req, res) => {
    let id = req.query.id_action;
    console.log(id)
    con.query("update actions ac set ac.status = 'C' WHERE ac.id_action = ?", id, (err, results, fields) => {
        if (err) {
            console.error('Finalizado', err);
            res.status(500).send('Error inserting book');
            return;
        }
    });
    con.query("insert into historic values(?,DEFAULT,'C')", id, (err, results, fields) => {
        if (err) {
            console.error('Finalizado no historico', err);
            res.status(500).send('Error inserting book');
            return;
        }
        res.status(200).redirect('/buscar');
    });
});

router.get('/emails', (req, res) => {
    con.query("SELECT email FROM customers", (err, results, fields) => {
        if (err) {
            console.error('Error querying customer names:', err);
            res.status(500).json({
                error: 'Error querying customer names'
            });
            return;
        }

        const customerNames = results.map(result => result.email);

        res.json(customerNames);
    });
});

router.get('/names', (req, res) => {
    con.query("SELECT names FROM customers", (err, results, fields) => {
        if (err) {
            console.error('Error querying customer names:', err);
            res.status(500).json({
                error: 'Error querying customer names'
            });
            return;
        }

        const customerNames = results.map(result => result.names);

        res.json(customerNames);
    });
});



module.exports = router;