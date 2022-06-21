const { readContentFile } = require('./utilities');

const getTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile();
  const speaker = talkers.find((talker) => talker.id === Number(id));

  if (!speaker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(speaker);
};

module.exports = getTalker;