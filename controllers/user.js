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

<<<<<<< HEAD
<<<<<<< HEAD
  const token = setUser(user);
  res.cookie("uid",token);
=======
  const sessionId = uuidv4(); //this will generate a session id
  setUser(sessionId,user);
  res.cookie("uid",sessionId);
>>>>>>> c8b695c (Added Basic Auth)
=======
  const token = setUser(user);
  res.cookie("uid",token);
>>>>>>> 3fcb0b4 (upgraded Auth from statefull to stateless auth(JWT TOKEN))
  
  return res.redirect("/");

}

module.exports  ={
  handleUserSignup,
  handleUserLogin,
}