const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

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
// const { readContentFile, writeContentFile, idGenerator } = require('./utilities');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.use((req, _res, next) => {
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
//   console.log('req.body:', req.body);
//   next();
// });

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
  return res.status(HTTP_OK_STATUS).json(speaker);
});

// Req 3 e Req 4
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

// app.use(validateToken);

// Req 5
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;

  const contentFile = await fs.readFile('./talker.json');
  const talkers = JSON.parse(contentFile);
  const id = talkers.length + 1;

  const newTalker = { id, name, age, talk };
  talkers.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

// Req 6
app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const contentFile = await fs.readFile('./talker.json');
  const talkers = JSON.parse(contentFile);

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.status(HTTP_OK_STATUS).json(talkers[talkerIndex]);
});

app.listen(PORT, () => {
  console.log('Online');
});
