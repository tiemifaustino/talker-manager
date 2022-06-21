const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('talker.json', 'utf-8'));

const writeContentFile = async (data) => {
  const talkers = await readContentFile();
  talkers.push(data);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
};

const validateQuery = async (req, res, next) => {
  const { q } = req.query;
  const talkers = await readContentFile();
  if (!q || q === '') return res.status(200).json(JSON.parse(talkers));
  next();
};

module.exports = {
  readContentFile,
  writeContentFile,
  validateQuery,
};