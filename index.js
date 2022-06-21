const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const talkerFile = './talker.json';
const generateToken = require('./middlewares/generateToken');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middlewares/validateTalker');
const validateToken = require('./middlewares/validateToken');
const { readContentFile, validateQuery } = require('./middlewares/utilities');

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
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
});

// Req 8
app.get('/talker/search', validateToken, validateQuery, async (req, res) => {
  const { q } = req.query;
  const talkers = await readContentFile();
  const filteredTalker = talkers.filter((talker) => talker.name.includes(q));
  
  if (!filteredTalker) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(filteredTalker);
});

// Req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talkerFile, 'utf-8');
  const talkersParsed = JSON.parse(talkers);
  const speaker = talkersParsed.find((talker) => talker.id === Number(id));

  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(speaker);
});

// Req 3 e Req 4
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

// Middleware utilizado para Req 5, 6 e 7 
app.use(validateToken);

// Req 5
app.post('/talker',
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;

  const contentFile = await fs.readFile(talkerFile);
  const talkers = JSON.parse(contentFile);
  const id = talkers.length + 1;

  const newTalker = { id, name, age, talk };
  talkers.push(newTalker);

  await fs.writeFile(talkerFile, JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

// Req 6
app.put('/talker/:id',
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const contentFile = await fs.readFile(talkerFile);
  const talkers = JSON.parse(contentFile);

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  await fs.writeFile(talkerFile, JSON.stringify(talkers));
  res.status(HTTP_OK_STATUS).json(talkers[talkerIndex]);
});

// Req 7
app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const contentFile = await fs.readFile(talkerFile);
  const talkers = JSON.parse(contentFile);

  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));

  await fs.writeFile(talkerFile, JSON.stringify(filteredTalkers));

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
