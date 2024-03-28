const redis = require("redis");
const client = redis.createClient();

(async () => {
  await client.connect();
})();

client.on("connect", () => {
  console.log("redis Connected!");
});

client.on("error", (err) => {
  console.log("Error in the Connection");
});

const setJWT = async (key, value) => {
  try {
    const setdata = await client.set(key, value);
    return setdata;
  } catch (error) {
    throw error;
  }
};

const getJWT = async (key) => {
  try {
    const myKeyValue = await client.get(key);
    return myKeyValue;
  } catch (error) {
    throw error;
  }
};

const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};


//done