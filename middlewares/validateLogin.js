const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordMinLength = 6;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const isValidEmail = regexEmail.test(email);
 
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValidEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
 
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < passwordMinLength) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
