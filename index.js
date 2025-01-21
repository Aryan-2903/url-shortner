const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const {connectToMongoDb} = require("./connect")
const {checkForAuthentication, restrictTo} = require("./middleware/auth")

const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");


const URL = require("./models/url");

const app = express();
const PORT = 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=> console.log("mongodb connected"))

app.set("view engine","ejs"); //to setup the view engine
app.set("views",path.resolve("./views")) //we tell that all our ejs files are in views folder


app.use(express.json()); //to parse the body
app.use(express.urlencoded({urlencoded:false})) //to parse the url
app.use(cookieParser()); //to parse the cookies
app.use(checkForAuthentication); //to check the authentication of the user



app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);



app.get("/url/:shortId",async (req,res) =>{
  const shortId = req.params.shortId;
  const entry= await URL.findOneAndUpdate(
    {
    shortId
  },
  {
    $push: {

      visitHistory :{
        timestamp:Date.now(),
      },

    }
  });
  res.redirect(entry.redirectURL);
  
})





app.listen(PORT,()=>{console.log(`port is running on ${PORT}`)});