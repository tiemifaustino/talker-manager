const fs = require('fs/promises');

const readContentFile = async () => JSON.parse(await fs.readFile('talker.json', 'utf-8'));

const writeContentFile = async (data) => {
  const talkers = await readContentFile();
  talkers.push(data);

  const talkersToStr = JSON.stringify(talkers);
  await fs.writeFile('talker.json', talkersToStr);
};

const idGenerator = async () => {
  const talkers = await readContentFile();
  return talkers.length + 1;
};

module.exports = {
  readContentFile,
  writeContentFile,
  idGenerator,
};