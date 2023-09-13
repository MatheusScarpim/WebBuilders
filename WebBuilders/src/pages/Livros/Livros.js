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
  res.render(path.join(__dirname + "/CadastroLivros", 'index 2.0.ejs'), { names: req.session.names});
});

router.get('/infoLivros', (req, res) => {
  let idLivro = req.query.id;
  DadosLivro(req,res, idLivro)
});

async function DadosLivro(req,res, id) {
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
      res.status(404).redirect("/")
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

module.exports = router;