const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(regexDate.test(watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!rate || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  validateWatchedAt(req, res, next);
  validateRate(req, res, next); 

  next();
};

module.exports = { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
};

/**
 Source:
 Validação de data: link: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
*/