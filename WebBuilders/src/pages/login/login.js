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
  res.render(path.join(__dirname + "/seCadastrar", 'index4.ejs'));
});

router.get('/AdicionarAdm', (req, res) => {
  res.render(path.join(__dirname + "/cadastrarADM", 'index.ejs'));
});

router.post('/AdicionarAdm', (req, res) => {
  let reqBody = req.body;
  con.query(`INSERT INTO adm values(?,'A')`, reqBody.email, (err, results, fields) => {
    if (err) {
      console.error('Error inserting adm:', err);
      res.status(500).send('Error inserting adm'); 
      return;
    }

    res.redirect("/");
  });
});



router.post('/cadastrar', (req, res) => {
  let reqBody = req.body;
  con.query('INSERT INTO customers SET ?', reqBody, (err, results, fields) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Error inserting user'); 
      return;
    }

    console.log('Id inserted: ' + results.insertId);
    res.render(path.join(__dirname + "/Login", 'index.ejs'));
  });
});

router.post('/entrar', (req, res) => {
  let reqBody = req.body;
  const query = 'SELECT * FROM customers WHERE `email` = ? AND `passwords` = ?';
  con.query(query, [reqBody.email, reqBody.passwords], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (results.length === 1) {
      conferirADM(req,res,reqBody.email)
      req.session.login = reqBody.email;
      res.status(200).redirect('/');
    } else {
      res.status(401).redirect('/entrar');
    }
  });
});

function conferirADM(req,res,email) {
  const query = `SELECT * FROM adm WHERE email = ? `;
  con.query(query, email, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro no servidor');
      return;
    }
    if (results.length === 1) {
      req.session.adm = results[0].cargo;
    }else
    {
      req.session.adm = "U";
    }
  });
}



module.exports = router;