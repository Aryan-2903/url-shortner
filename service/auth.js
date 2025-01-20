const jwt = require("jsonwebtoken");
const secret = "Aryan@&512";

function setUser( user) {

  return jwt.sign({
    _id:user._id,
    email:user.email
  },secret);
} //function to create tokens

function getUser(token) {
  if(!token) return null;
  try {
    return jwt.verify(token,secret);

    
  } catch (error) {
    return null;
    
  }
const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  const user = sessionIdToUserMap.get(id);
  return user;
}

module.exports = {
  setUser,
  getUser,
};