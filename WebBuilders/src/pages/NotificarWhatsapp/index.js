/*
const http = require('http');

const credentials = {
  username: "adm",
  senha: "adm",
};

// Função para gerar o token
function gerarToken(callback) {
  const url = 'http://4fc4-138-186-2-162.ngrok-free.app/token';

  const options = {
    method: 'GET',
    headers: {
      'username': credentials.username,
      'senha': credentials.senha,
    },
  };

  const req = http.request(url, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        const token = response.Token;
        callback(null, token);
      } catch (error) {
        callback(error, null);
      }
    });
  });

  req.on('error', (error) => {
    callback(error, null);
  });

  req.end();
}

// Função para enviar a mensagem
function enviarMensagem(telefone, mensagem, token) {
  const url = 'http://4fc4-138-186-2-162.ngrok-free.app/sendText';

  const data = JSON.stringify({
    message: mensagem,
  });

  const options = {
    method: 'POST',
    headers: {
      'Token': token,
      'telnumber': telefone,
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = http.request(url, options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(responseData);
        console.log('Resposta da API:', response);
      } catch (error) {
        console.error('Erro ao analisar a resposta:', error);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erro ao enviar a mensagem:', error);
  });

  req.write(data);
  req.end();
}

// Exemplo de uso
const telefone = "123456789"; // Substitua pelo número de telefone desejado
const mensagem = "Olá, esta é uma mensagem de teste."; // Substitua pela mensagem desejada

gerarToken((error, token) => {
  if (error) {
    console.error('Erro ao obter o token:', error);
  } else {
    enviarMensagem(telefone, mensagem, token);
  }
});
*/