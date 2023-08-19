const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const con = require('../../Banco/MySQL/conexaoMysql');
const path = require('path');
const fs = require('fs');

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
router.get('/cadbook', (req, res) => {
  res.render(path.join(__dirname + "/CadastroLivros", 'index.ejs'));
});

router.get('/infoLivros', (req, res) => {
  let idLivro = req.query.id;
  DadosLivro(res, idLivro)
});

async function DadosLivro(res, id) {
  con.query('SELECT * FROM book where id_book = ?', parseInt(id), (err, linhas) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Error fetching books');
      return;
    }
    let book = linhas[0]

    try {
      res.render(path.join(__dirname + "/DadosLivro", 'index.ejs'), {
        book
      });
    } catch (error) {
      res.status(404).redirect("/")
    }
  });
}

const upload = multer({
  storage: storage
});
router.post('/cadbook', upload.single('image'), (req, res) => {
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

    res.status(200).send('Book inserted successfully');
  });
});


router.get('/livros', (req, res) => {
  con.query('SELECT * FROM book', (err, books) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Error fetching books');
      return;
    }
    console.log(books)
    res.render(path.join(__dirname + "/ListaLivros", 'index.ejs'), {
      books
    });
  });
});


module.exports = router;