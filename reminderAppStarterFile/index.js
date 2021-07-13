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

app.post("/login", passport.authenticate("local", {
  successRedirect: "/templogin",
  failureRedirect: "/login",
}));

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
