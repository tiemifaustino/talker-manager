const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('talker.json', 'utf-8'));

const writeContentFile = async (data) => {
  const talkers = await readContentFile();
  talkers.push(data);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
};

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readContentFile();
  const id = talkers.length + 1;
  const newTalker = { id, name, age, talk };
  talkers.push(newTalker);
  await writeContentFile(newTalker);

  res.status(201).json(newTalker);
};

const updateTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readContentFile();

  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };
  await writeContentFile(talkers[talkerIndex]);

  res.status(200).json(talkers[talkerIndex]);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile();
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(filteredTalkers));
  res.status(204).end();
};

module.exports = {
  readContentFile,
  writeContentFile,
  createTalker,
  updateTalker,
  deleteTalker,
};