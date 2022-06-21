const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('talker.json', 'utf-8'));

const writeContentFile = async (data) => {
  const talkers = await readContentFile();
  talkers.push(data);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
};

const deleteContentFile = async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile();
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(filteredTalkers));
  res.status(204).end();
};

const validateQuery = async (req, res, next) => {
  const { q } = req.query;
  const talkers = await readContentFile();
  if (!q || q === '') return res.status(200).json(talkers);
  next();
};

module.exports = {
  readContentFile,
  writeContentFile,
  validateQuery,
  deleteContentFile,
};