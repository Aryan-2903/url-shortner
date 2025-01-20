const express = require("express");
const path = require("path");
const {connectToMongoDb} = require("./connect")

const staticRoute = require("./routes/staticRouter")


const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=> console.log("mongodb connected"))

app.set("view engine","ejs"); //to setup the view engine
app.set("views",path.resolve("./views")) //we tell that all our ejs files are in views folder


app.use(express.json()); //to parse the body
app.use(express.urlencoded({urlencoded:false}))



app.use("/url",urlRoute);
app.use("/", staticRoute);



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