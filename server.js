require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
//const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
//const axios = require("axios");
// const db = require("./models");
// const passport = require("passport");
// const session = require("express-session");
// const methodOverride = require("method-override");
app.use(cors())

//config for JwtStrategy which reads the JWT from the http Auth header with scheme 'bearer'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// const JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "mywebsite.com"

//setup Passport
// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//   User.findOne({ id: jwt_payload.sub }, function (err, user) {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   });
// }));

//jwt callback
// let cookieExtractor = function (req) {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies["jwt"];
//   }
//   return token;
// }

// app.post("/profile", passport.authenticate("jwt", { session: false }),
//   function (req, res) {
//     res.send(req.user.profile);
//   }
// );


const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
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
const { isBuffer } = require("lodash");
const Candidate = require("./models/Candidate");


// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }


app.get("/api", (req, res) => {
  res.json({ message: "Time to recruit some folks!" })
})

//CANDIDATE ROUTES

//push candidate test data to dB
app.post("/api/candidate", (req, res) => {
  console.log("request object", req.body)
  const records = new CandidateModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new candidate worked!" })
  })
})

//route to get candidates 
app.get("/api/candidates", (req, res) => {
  CandidateModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all candidates." })
  })
})

//Update
app.put("/api/candidate", (req, res) => {
  CandidateModel.findOneAndUpdate({
    _id: req.body._id
  }, req.body, { new: true }, function (err, candidate) {
    if (err)
      res.send(err)
    candidate.save(function () {
      if (!err)
        res.json({ data: candidate, message: "Candidate updated successfully." })
    })
  })
})

//Delete
app.delete("/api/candidate/:id", (req, res) =>
  Candidate.findOneAndRemove({
    _id: req.params.id
  }, (err, candidate) => {
    if (err) {
      res.send("deletion fail")
    } else {
      console.log(candidate);
      res.status(204)
    }
  }))


//POSITION ROUTES

//push position test data to dB
app.post("/api/position", (req, res) => {
  console.log("request object", req.body);
  const records = new PositionModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new position worked!" })
  })
})

//route to get position  
app.get("/api/positions", (req, res) => {
  PositionModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all positions." })
  })
})

//update
app.put("/api/position", (req, res) => {
  PositionModel.findOneAndUpdate({
    _id: req.body._id
  }, req.body, { new: true }, function (err, position) {
    if (err)
      res.send(err)
    position.save(function () {
      if (!err)
        res.json({ data: position, message: "Position updated successfully." })
    })
  }
  )
}
)

//USER ROUTES

//push user test data to dB
app.post("/api/user", (req, res) => {
  console.log("request object", req.body);
  const records = new UserModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new user worked!" })
  })
})

//route to get user
app.get("/api/users", (req, res) => {
  UserModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all users." })
  })
})

//update
app.put("/api/user", (req, res) => {
  UserModel.findOneAndUpdate({
    _id: req.body._id
  }, req.body, { new: true }, function (err, user) {
    if (err)
      res.send(err)
    user.save(function () {
      if (!err)
        res.json({ data: position, message: "User updated successfully." })
    })
  }
  )
}
)

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port: http://localhost:${PORT}`);
});
