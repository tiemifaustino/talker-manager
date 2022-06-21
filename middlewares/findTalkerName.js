const { readContentFile } = require('./utilities');

const findTalkerName = async (req, res) => {
  const { q } = req.query;
  const talkers = await readContentFile();
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (!filteredTalkers) return res.status(200).json([]);

  res.status(200).json(filteredTalkers);
};

module.exports = findTalkerName;