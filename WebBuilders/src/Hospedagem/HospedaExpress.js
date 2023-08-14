const express = require('express');
const http = require('http');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session'); // Move session import here
const initSystem = require('../Logger/dadosInit');
const principal = require('../pages/principal/principal');
const login = require('../pages/login/login');
const relatorio = require('../pages/Relatorio/relatorio');
const Livros = require('../pages/Livros/Livros.js');
const AlterarDados = require('../pages/AlterarDados/alterarDados');

const path = require('path');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  session({
    secret: 'portabeta123',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30000000,
    },
  })
);

function isAuthenticated(req, res, next) {
  const publicRoutes = ['/entrar', '/cadastrar']; // Add other public routes if needed

  if (publicRoutes.includes(req.path) || req.session.login != undefined) {
    next();
  } else {
    res.redirect('/entrar');
  }
}

app.use("/", isAuthenticated);
app.use("/", principal);
app.use("/", login);
app.use("/", relatorio);
app.use("/", Livros);
app.use("/", AlterarDados);

app.get('/status', (req, res) => {
  res.json({
    "status": "OK"
  });
});

const port = process.env.PORT || 21062;
const server = http.createServer(app);

server.listen(port, () => {
  initSystem.logo('The app is running on port ' + port);
});

module.exports.Livros = Livros;
module.exports.principal = principal;
module.exports.login = login;
module.exports.relatorio = relatorio;
module.exports.AlterarDados = AlterarDados;