const {v4:uuidv4} = require("uuid")
const {setUser ,getUser} = require("../service/auth")

const User = require("../models/users");

async function handleUserSignup(req,res){
  const {name, email, password} = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");

}

async function handleUserLogin(req,res){
  const { email, password} = req.body;
  const user = await User.findOne({email ,password});
  if(!user){
    return res.render("login",{
      error:"Invalid email or password"
    });
  }

  const sessionId = uuidv4(); //this will generate a session id
  setUser(sessionId,user);
  res.cookie("uid",sessionId);
  
  return res.redirect("/");

}

module.exports  ={
  handleUserSignup,
  handleUserLogin,
}