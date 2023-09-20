const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const con = require('../../Banco/MySQL/conexaoMysql');
const path = require('path');
const fs = require('fs');

const cargo = require("../Cargo/cargo");
const checkCargo = require('../Cargo/cargo');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads'); // Specify the path where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

router.use(bodyParser.urlencoded({
  extended: true
}));
router.get('/cadbook', checkCargo("A"), (req, res) => {
  console.log(req.session.adm)
  res.render(path.join(__dirname + "/CadastroLivros", 'index 2.0.ejs'), { names: req.session.names });
});

router.get('/infoLivros', (req, res) => {
  let idLivro = req.query.id;
  DadosLivro(req, res, idLivro)
});

async function DadosLivro(req, res, id) {
  con.query('SELECT * FROM book where id_book = ?', parseInt(id), (err, linhas) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Error fetching books');
      return;
    }
    let book = linhas[0]

    try {
      res.render(path.join(__dirname + "/DadosLivro", 'index2.0.ejs'), {
        book, names: req.session.names
      });
    } catch (error) {
      res.status(404).redirect("/erro");
    }
  });
}

const upload = multer({
  storage: storage
});
router.post('/cadbook', checkCargo("A"), upload.single('image'), (req, res) => {
  const reqBody = req.body;
  const imagePath = req.file.path;
  const imageBuffer = fs.readFileSync(imagePath);

  reqBody.foto = imageBuffer;

  con.query('INSERT INTO book SET ?', reqBody, (err, results, fields) => {
    if (err) {
      console.error('Error inserting book:', err);
      res.status(500).send('Error inserting book');
      return;
    }

    console.log('Id inserted: ' + results.insertId);

    res.status(200).redirect('/livros');
  });
});


router.get('/livros', (req, res) => {
  con.query('SELECT * FROM book', (err, books) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Error fetching books');
      return;
    }
    res.render(path.join(__dirname + "/ListaLivros", 'index.ejs'), {
      books, names: req.session.names
    });
  });
});

async function ChecaLivro(req, res, idBook) {
  return new Promise((resolve, reject) => {
    console.log('(ChecaLivro) Livro: ' + idBook);
    con.query('SELECT available FROM book WHERE id_book = ?', [idBook], (err, disponibilidade) => {
      if (err) {
        console.error('Error fetching books:', err);
        res.status(404).redirect("/erro");
        reject(err);
        return false;
      }
      let LivroDisponivel = disponibilidade[0].available;
      console.error('Livroooooo'+LivroDisponivel);
      resolve(LivroDisponivel != 0);
    });
  });
}


router.post('/reservar/:id_book', async (req, res) => {
  const idBook = req.params.id_book;
  const idCustomer = req.session.id_customer;

  let LivroDisponivel = await ChecaLivro(req, res, idBook);
  console.error('Livroooooo        '+LivroDisponivel);
  if (LivroDisponivel) {
    con.query('UPDATE book SET available = ? WHERE id_book = ?', [0, idBook], (err, results, fields) => {
      if (err) {
        console.error('Error updating book:', err);
        res.status(500).send('Error updating book');
        return;
      }
    });
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    con.query('INSERT INTO actions (id_book, id_customer, date_init, status) VALUES (?, ?, ?, ?)', [idBook, idCustomer, currentDate, "R"], (err, results, fields) => {
      if (err) {
        console.error('Error inserting into actions:', err);
        res.status(500).send('Error inserting into actions');
        return;
      }
    });
    con.query('INSERT INTO historic (date, status_book) VALUES (?, ?)', [currentDate, "R"], (err, results, fields) => {
      if (err) {
        console.error('Error inserting into historic:', err);
        res.status(500).send('Error inserting into historic');
        return;
      }
      console.error('Livro Reservado !');
    });
  } else
    console.error('Livro ja Reservado !');
    res.status(200).redirect('/livros');
});

module.exports = router;