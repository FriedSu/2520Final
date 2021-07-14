const express = require("express");
const passport = require('./middleware/passport');
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");

const session = require("express-session");


app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// GITHUB ATTEMPT PART 1 (Part 2 further down)
const GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy({
    clientID: '11bb17231fada7ee9f37',
    clientSecret: 'f258c7ebaae840f790c5afc7bcbdc330f61c8ab6',
    callbackURL: "http://localhost:3002/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here
// app.post("/login", passport.authenticate("local", { successRedirect: "/reminders", failureRedirect: "/login"}))

app.post("/reminder/", ensureAuthenticated, reminderController.create);

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);



// Implement this yourself ✅
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself ✅
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
// app.get("/register", authController.register); <--- DONT NEED TO CODE
// app.get("/login", authController.login);

app.get("/login", forwardAuthenticated, (req, res) => {
  res.render("auth/login");
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
});



app.post("/login", passport.authenticate("local", {
  successRedirect: "/reminders",
  failureRedirect: "/login",
}));

// GITHUB ATTEMPT PART 2
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3002, function () {
  console.log(
    "Server running. Visit: localhost:3002/reminders in your browser 🚀"
  );
});
