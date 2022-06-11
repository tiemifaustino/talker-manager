const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordMinLength = 6;

const validadeLogin = (req, res, next) => {
  const { email, password } = req.body;

  const isValid = (regexEmail.test(email)) && (passwordMinLength >= password.length);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }
  next();
};

module.exports = validadeLogin;