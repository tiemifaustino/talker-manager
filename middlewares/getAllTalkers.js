const { readContentFile } = require('./utilities');

const getAllTalkers = async (_req, res) => {
  const talkers = await readContentFile();
  res.status(200).json(talkers);
};

module.exports = getAllTalkers;