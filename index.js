const express = require("express");
const {connectToMongoDb} = require("./connect")


const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=> console.log("mongodb connected"))

app.use(express.json()); //to parse the body

app.use("/url",urlRoute);

app.get("/:shortId",async (req,res) =>{
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