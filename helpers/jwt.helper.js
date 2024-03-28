const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis.helper");
const { storeUserRefreshJWT } = require("../model/user/User.model");
const { token } = require("morgan");

const crateAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d", // Change expiration time to 15 minutes
    });
   await setJWT(accessJWT, _id);
    return accessJWT;
  } catch (error) {
    throw error;
  }
};

const crateRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    await storeUserRefreshJWT(_id, refreshJWT);
    return refreshJWT;
  } catch (error) {
    throw error;
  }
};

const verifyAccessJWT = (userJWT) => {
  try {
   const verifyToken= jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET)
   return verifyToken;
  } catch (error) {
    throw error
  }
}

const verifyRefreshJWT = (userJWT) => {
  try {
   const verifyToken= jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET)
   return verifyToken;
  } catch (error) {
    throw error
  }
}
module.exports = {
  crateAccessJWT,
  crateRefreshJWT,
  verifyAccessJWT,
   verifyRefreshJWT, 
};


//done