if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/recruiter-tron";
const PORT = process.env.PORT || 3001;

const express = require("express");
const session = require("express-session");
const mongo_session = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const app = express();
const store = new mongo_session({
  uri: MONGODB_URI,
  collection: 'Sessions'
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ store, secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session());
app.use(require("morgan")("dev"));

//Handle db connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "error"))

// db.once("connected", function () {
//   console.log("Connected");
// })

//import models
const CandidateModel = require("./models/Candidate");
const PositionModel = require("./models/Position");
const UserModel = require("./models/User");

// Passport
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy((username, password, done) => {
  UserModel.findOne({ username }).then((user) => {
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    user.validatePassword(password).then(({ match }) => {
      if (match) { 
        return done(null, user);
      }
      return done(null, false, { message: 'Incorrect username or password.' });
    })
  }).catch(err => {
    return done(err);
  })
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
})

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).end();
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.send(401);
  }
}

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});
app.get('/logout', (req, res) => {
  console.log('logout!');
  req.logout();
  req.session.user = null;
  req.session = null;
  res.redirect('/');
})
// End Passport

app.get("/api/me", (req, res) => {
  if (req.user) {
    const { firstName, lastName, username, admin } = req.user
    res.json({ firstName, lastName, username, admin });
  } else {
    res.send(401);
  }
});

//CANDIDATE ROUTES
//push candidate test data to dB
app.post("/api/candidate", isLoggedIn, (req, res) => {
  console.log("request object", req.body)
  const records = new CandidateModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new candidate worked!" })
  })
})

//route to get candidates 
app.get("/api/candidates", isLoggedIn, (req, res) => {
  CandidateModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all candidates." })
  })
})

//Update
app.put("/api/candidate", isLoggedIn, (req, res) => {
  CandidateModel.findOneAndUpdate({
    email: req.body.email
    // _id: req.body._id
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
app.delete("/api/candidate", isLoggedIn, (req, res) =>
  CandidateModel.findOneAndRemove({
    // _id: req.body.id
    email: req.body.email
  }, (err, candidate) => {
    if (err) {
      res.send("deletion fail")
    } else {
      console.log(candidate);
      res.status(204).json({ message: "Candidate deleted successfully." })
    }
  }))


//POSITION ROUTES
//push position test data to dB
app.post("/api/position", isLoggedIn, (req, res) => {
  console.log("request object", req.body);
  const records = new PositionModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new position worked!" })
  })
})

//route to get position  
app.get("/api/positions", isLoggedIn, (req, res) => {
  PositionModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all positions." })
  })
})

//Update
app.put("/api/position", isLoggedIn, (req, res) => {
  PositionModel.findOneAndUpdate({
    // _id: req.body._id
    req: req.body.req
  }, req.body, { new: true }, function (err, position) {
    if (err)
      res.send(err)
    position.save(function () {
      if (!err)
        res.json({ data: position, message: "Position updated successfully." })
    })
  })
})

//Delete
app.delete("/api/position", isLoggedIn, (req, res) =>
  PositionModel.findOneAndRemove({
    // _id: req.body.id
    req: req.body.req
  }, (err, position) => {
    if (err) {
      res.send("deletion fail")
    } else {
      console.log(position);
      res.status(204).json({ message: "Position deleted successfuly." })
    }
  }))


//USER ROUTES
//push user test data to dB
app.post("/api/user", isAdmin, (req, res) => {
  console.log("request object", req.body);
  const records = new UserModel(req.body);
  records.save((err, doc) => {
    if (err)
      res.send(err)
    res.json({ data: doc, message: "Testy test, new user worked!" })
  })
})

//route to get users
app.get("/api/users", isAdmin, (req, res) => {
  UserModel.find({}, (err, doc) => {
    res.json({ data: doc, message: "Fetched all users." })
  })
})

//update
app.put("/api/user", isAdmin, (req, res) => {
  UserModel.findOneAndUpdate({
    // _id: req.body._id
    username: req.body.username
  }, req.body, { new: true }, function (err, user) {
    if (err)
      res.send(err)
    user.save(function () {
      if (!err)
        res.json({ data: user, message: "User updated successfully." })
    })
  })
})

//Delete
app.delete("/api/user", isAdmin, (req, res) =>
  UserModel.findOneAndRemove({
    // _id: req.body.id
    username: req.body.username
  }, (err, user) => {
    if (err) {
      res.send("deletion fail")
    } else {
      console.log(user);
      res.status(204).json({ message: "User deleted successfuly." })
    }
  }))


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port: http://localhost:${PORT}`);
});
