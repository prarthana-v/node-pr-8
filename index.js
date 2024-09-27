const express = require("express");
const app = express();
const port = 8000;

const cookieParser = require("cookie-parser");

// flash connect
const flash = require("connect-flash");

// path
const path = require("path");

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database attachment
const connectDB = require("./config/db");
connectDB();

// admin panel css attachment
app.use("/", express.static(path.join(__dirname, "public")));

// passort js attachment
const passport = require("passport");
const passportLocal = require("./config/passportLocal");
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

// routes
app.use("/", require("./routes/indexRoute"));

app.listen(port, (err) => {
  if (err) {
    console.log(`error`);
    return false;
  }
  console.log(`server run on `, port);
});
