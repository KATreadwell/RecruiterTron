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
  collection: 'sessions'
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
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
    user.validatePassword(password).then((match) => {
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
    res.status(401).end();
  }
}

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.end();
});
app.get('/logout', (req, res) => {
  req.logout();
  res.end();
})
// End Passport

api = express.Router();

api.get("/me", (req, res) => {
  if (req.user) {
    const { firstName, lastName, username, admin } = req.user
    res.json({ firstName, lastName, username, admin });
  } else {
    res.status(401).end();
  }
});

//CANDIDATE ROUTES
//push candidate test data to dB
api.post("/candidate", isLoggedIn, async (req, res) => {
  const model = new CandidateModel(req.body);
  try {
    res.json(await model.save());
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

//route to get candidates 
api.get("/candidates", isLoggedIn, async (req, res) => {
  res.json(await CandidateModel.find({}));
})

//Update
api.put("/candidate", isLoggedIn, async (req, res) => {
  const { email } = req.body;
  try {
    res.json(await CandidateModel.findOneAndUpdate({ email }, req.body));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

//Delete
api.delete("/candidate", isLoggedIn, async (req, res) => {
  const { email } = req.body;
  try {
    res.json(await CandidateModel.deleteMany({ email }));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})


//POSITION ROUTES
//push position test data to dB
api.post("/position", isLoggedIn, async (req, res) => {
  const model = new PositionModel(req.body);
  try {
    res.json(await model.save());
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

//route to get position  
api.get("/positions", isLoggedIn, async (req, res) => {
  res.json(await PositionModel.find({}));
})

//Update
api.put("/position", isLoggedIn, async (req, res) => {
  try {
    res.json(await PositionModel.findOneAndUpdate({ req: req.body.req }, req.body));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

//Delete
api.delete("/position", isLoggedIn, async (req, res) => {
  try {
    res.json(await PositionModel.deleteMany({ req: req.body.req }));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})


//USER ROUTES
//push user test data to dB
api.post("/user", isAdmin, async (req, res) => {
  const model = new UserModel(req.body);
  try {
    res.json(await model.save());
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

//route to get users
api.get("/users", isAdmin, async (req, res) => {
  const users = (await UserModel.find({})).map((user) => {
    return Object.assign(user.toObject(), { password: '*****' });
  });
  res.json(users);
})

//update
api.put("/user", isAdmin, async (req, res) => {
  const { username } = req.body;
  try {
    res.json(await UserModel.findOneAndUpdate({ username }, req.body));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

//Delete
api.delete("/users", isAdmin, async (req, res) => {
  const { username } = req.body;
  try {
    res.json(await UserModel.deleteMany({ username }));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
})

app.use('/api', api);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port: http://localhost:${PORT}`);
});
