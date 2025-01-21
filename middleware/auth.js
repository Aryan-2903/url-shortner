const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if(!tokenCookie)
    return next();

  const token = tokenCookie;
  const user = getUser(token)

  req.user = user;
  return next();
}

function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  }
}

module.exports={
  checkForAuthentication,
  restrictTo
}







/*
//authentication
function checkForAuthentication(req,res,next){
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
    return next();

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token)

  req.user = user;
  return next();
}


//authorization
function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  }
}

module.exports = {
  checkForAuthentication,
  restrictTo,
}
/*









/*
async function restrictToLoggedinUserOnly(req, res, next) {
  // const userUid = req.cookies?.uid;
  const userUid = req.headers["authorization"]


  if (!userUid) return res.redirect("/login");
  const token = userUid.split("Bearer ")[1] //"Bearer 23jasgdu64"
  const user = await getUser(token);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // const userUid = req.cookies?.uid;
  const userUid = req.headers["authorization"]
  const token = userUid.split("Bearer ")[1] //"Bearer 23jasgdu64"



  
  // const user = await getUser(userUid);
  const user = await getUser(token);



  req.user = user;
  next();
}
  module.exports ={
  restrictToLoggedinUserOnly,
  checkAuth,
}

*/



