const express = require('express');
const bodyParser = require('body-parser');
const generateToken = require('./middlewares/generateToken');
const validateToken = require('./middlewares/validateToken');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const {
  readContentFile,
  writeContentFile,
  deleteContentFile,
  validateQuery } = require('./middlewares/utilities');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('./middlewares/validateTalker');

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
  const talkers = await readContentFile();
  res.status(HTTP_OK_STATUS).json(talkers);
});

// Req 8
app.get('/talker/search', validateToken, validateQuery, async (req, res) => {
  const { q } = req.query;
  const talkers = await readContentFile();
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (!filteredTalkers) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

// Req 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile();
  const speaker = talkers.find((talker) => talker.id === Number(id));

  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(speaker);
});

// Req 3 e Req 4
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  res.status(HTTP_OK_STATUS).json({ token });
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
  const talkers = await readContentFile();
  const id = talkers.length + 1;
  const newTalker = { id, name, age, talk };
  talkers.push(newTalker);
  await writeContentFile(newTalker);

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
  const talkers = await readContentFile();

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await writeContentFile(talkers[talkerIndex]);

  res.status(HTTP_OK_STATUS).json(talkers[talkerIndex]);
});

// Req 7
app.delete('/talker/:id', deleteContentFile);

app.listen(PORT, () => console.log('Online'));
