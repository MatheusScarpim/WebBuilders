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
// /AdicionarAdm
router.get('/AdicionarAdm', (req, res) => {
  res.render(path.join(__dirname + "/cadastrarADM", 'index.ejs'));
});

router.post('/AdicionarAdm', (req, res) => {
  let reqBody = req.body;
  con.query("INSERT INTO adm VALUES (?,'A')", reqBody.email, (err, results, fields) => {
    if (err) {
      console.error('Error inserting adm:', err);
      res.status(500).send('Error inserting adm');
      return;
    }

    res.redirect('/');
  })
})

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
  con.query(query, [reqBody.email, reqBody.passwords], async (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (results.length === 1) {
      let dadosADM = await conferirADM(req,res,reqBody.email)
      console.log(dadosADM)
      req.session.login = reqBody.email;
      req.session.names = results[0].names;
      req.session.adm = dadosADM;
      res.status(200).redirect('/');
    } else {
      res.status(401).redirect('/entrar');
    }
  });
});

function conferirADM(req, res, email) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM adm WHERE email = ? `;
    con.query(query, email, (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        reject(err); 
        return;
      }

      if (results.length === 1) {
        resolve(results[0].cargo); // Resolver a Promise com o cargo
      } else {
        resolve("U"); // Resolver a Promise com "U" se não houver resultados
      }
    });
  });
}




module.exports = router;