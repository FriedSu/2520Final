const express = require("express");
const passport = require('./middleware/passport');
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");
let database = require("./database");

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

app.use(passport.initialize());
app.use(passport.session());

// GITHUB ATTEMPT PART 1 (Part 2 further down)
const GitHubStrategy = require('passport-github').Strategy;
const { fstat } = require("fs");
passport.use(new GitHubStrategy({
    clientID: '11bb17231fada7ee9f37',
    clientSecret: 'f258c7ebaae840f790c5afc7bcbdc330f61c8ab6',
    callbackURL: "http://localhost:3004/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    let id = Number(profile.id)
    let name = profile._json.name
    let email = profile._json.email
    // console.log(id)
    // console.log(name)
    // console.log(email)
    let id_list = []
    for (const data of database) {
      id_list.push(data.id)
    }

    // console.log(id_list)

    if (id_list.includes(id)) {
      // console.log(database)
    } else {
      githubData = {
        id: id,
        name: name,
        email: email,
        reminders: [],
      }
      console.log(githubData)
      database.push(githubData)
      
    }

    

    // database.push(githubData)
    

    cb(null, profile);
  }
));

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
    res.redirect('/reminders');
  });

app.listen(3004, function () {
  console.log(
    "Server running. Visit: localhost:3004/reminders in your browser 🚀"
  );
});
