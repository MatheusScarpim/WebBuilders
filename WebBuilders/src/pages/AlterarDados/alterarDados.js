const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const con = require('../../Banco/MySQL/conexaoMysql');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/alterarUsuario', (req, res) => {
    con.query('SELECT * FROM customer where email =?', req.session.login, (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        console.log(users)
        let user = users[0];
        res.render(path.join(__dirname + "/AlteraDadosUsuario", 'index.ejs'), {
            user
        });
    });
});
router.post('/alterarUsuario', (req, res) => {
    const reqBody = req.body;
    con.query('Update customer set ? where email =?', [reqBody, req.session.login], (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.redirect("/")
    });
});

module.exports = router;