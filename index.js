const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const generateToken = require('./generateToken');
const { validadeEmail, validatePassword } = require('./validateLogin');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req 1
app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

// Req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const talkersParsed = JSON.parse(talkers);
  const speaker = talkersParsed.find((talker) => talker.id === Number(id));

  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(speaker);
});

// Req 3 e Req 4
app.post('/login', validadeEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

// Req 5
app.post('/talker', (_req, _res) => {
  // const { }
});

app.listen(PORT, () => {
  console.log('Online');
});
