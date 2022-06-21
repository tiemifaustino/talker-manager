const { readContentFile } = require('./utilities');

const validateQuery = async (req, res, next) => {
  const { q } = req.query;
  const talkers = await readContentFile();
  if (!q || q === '') return res.status(200).json(talkers);
  next();
};

module.exports = validateQuery;