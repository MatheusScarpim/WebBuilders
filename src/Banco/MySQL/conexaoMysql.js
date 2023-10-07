require('dotenv').config();
const mysql = require('mysql');
const initSystem = require('../../Logger/dadosInit')

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  initSystem.logo(`Conexão sucedida com o banco
    ${process.env.DB_HOST}`)
});

module.exports = connection