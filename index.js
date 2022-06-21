const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const getTalker = require('./middlewares/getTalker');
const getAllTalkers = require('./middlewares/getAllTalkers');
const findTalkerName = require('./middlewares/findTalkerName');
const postToken = require('./middlewares/generateToken');
const validateToken = require('./middlewares/validateToken');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const validateQuery = require('./middlewares/validateQuery');
const { createTalker, updateTalker, deleteTalker } = require('./middlewares/utilities');
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
app.get('/talker', rescue(getAllTalkers));

// Req 8
app.get('/talker/search', rescue(validateToken), rescue(validateQuery), rescue(findTalkerName));

// Req 2
app.get('/talker/:id', rescue(getTalker));

// Req 3 e Req 4
app.post('/login', rescue(validateEmail), rescue(validatePassword), rescue(postToken));

// Middleware utilizado para Req 5, 6 e 7 
app.use(validateToken);

// Req 5
app.post('/talker',
  rescue(validateName),
  rescue(validateAge),
  rescue(validateTalk),
  rescue(validateWatchedAt),
  rescue(validateRate),
  rescue(createTalker));

// Req 6
app.put('/talker/:id',
  rescue(validateName),
  rescue(validateAge),
  rescue(validateTalk),
  rescue(validateWatchedAt),
  rescue(validateRate),
  rescue(updateTalker));

// Req 7
app.delete('/talker/:id', rescue(deleteTalker));

app.listen(PORT, () => console.log('Online'));
