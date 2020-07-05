require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const axios = require("axios");
// const db = require("./models")

const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost/recruiter-tron";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Handle db connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error"))

db.once("connected", function(){
  console.log("Connected");
})
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

//

//router setup
const router = express.Router();

//middleware
router.use(function(req, res, next){
  console.log("Damn it!");
  next();
})

router.get("/", function(req, res){
  res.json({message: "Time to recruit some folks!"})
})



// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port: http://localhost:${PORT}`);
});
