const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  const Hashdata = bcrypt.hashSync(plainPassword, saltRounds);
  return Hashdata;
};

const comparePassword = async (plainPass, passFromDb) => {
  try {
    return await bcrypt.compare(plainPass, passFromDb);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};

//done success