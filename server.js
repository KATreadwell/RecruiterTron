require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const axios = require("axios");
const db = require("./models");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//config for JwtStrategy which reads the JWT from the http Auth header with scheme 'bearer'
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = "accounts.examplesoft.com";
opts.audience = "mywebsite.com"

//setup Passport
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

//jwt callback
let cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
}

app.post("/profile", passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user.profile);
  }
);


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

db.once("connected", function () {
  console.log("Connected");
})

//import models
const CandidateModel = require("./models/Candidate");
const PositionModel = require("./models/Position");
const UserModel = require("./models/User");
const User = require("./models/User");



// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }


app.get("/api", (req, res) => {
  res.json({ message: "Time to recruit some folks!" })
})

//push candidate test data to dB
app.post("/api/candidate", (req, res) => {
  const records = new CandidateModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new candidate worked!" })
  })
})

//route to get candidates + CRUD  
app.get("/api/candidates", (req, res) => {
  CandidateModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all candidates." })
  })
})

//push position test data to dB
app.post("/api/position", (req, res) => {
  const records = new PositionModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new position worked!" })
  })
})

//route to get position + CRUD  ***coworker says I should use router.route and re-write all of these app. to router.route
app.get("/api/positions", (req, res) => {
  PositionModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all positions." })
  })
})


// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port: http://localhost:${PORT}`);
});
