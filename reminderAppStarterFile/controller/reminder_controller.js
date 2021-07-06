let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    let title = req.body.title
    let description = req.body.description
    let completed = req.body.completed
    if (req.body.completed == 'false') {
      completed = false
    } else {
      completed = true
    }

    databaseObj = database.cindy.reminders
    index = databaseObj.indexOf(searchResult)

    searchResult['title'] = title
    searchResult['description'] = description
    searchResult['completed'] = completed
    res.render("reminder/single-reminder", { reminderItem: searchResult });
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    databaseObj = database.cindy.reminders
    index = databaseObj.indexOf(searchResult)

    databaseObj.splice(index,1)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
