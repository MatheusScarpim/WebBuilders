const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const con = require('../../Banco/MySQL/conexaoMysql');

router.use(bodyParser.urlencoded({
  extended: true
}));


router.get('/entrar', (req, res) => {
  res.render(path.join(__dirname + "/Login", 'index.ejs'));
});

router.get('/cadastrar', (req, res) => {
  res.render(path.join(__dirname + "/seCadastrar", 'index.ejs'));
});


router.post('/cadastrar', (req, res) => {
  let reqBody = req.body;
  con.query('INSERT INTO customer SET ?', reqBody, (err, results, fields) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Error inserting user'); // Changed the message
      return;
    }

    console.log('Id inserted: ' + results.insertId);

    res.status(200).send('User inserted successfully');
  });
});

router.post('/entrar', (req, res) => {
  let reqBody = req.body;
  const query = 'SELECT * FROM customer WHERE `email` = ? AND `passwords` = ?';
  con.query(query, [reqBody.email, reqBody.passwords], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (results.length === 1) {
      req.session.login = reqBody.email;
      res.status(200).redirect('/');
    } else {
      res.status(401).redirect('/entrar');
    }
  });
});

module.exports = router;