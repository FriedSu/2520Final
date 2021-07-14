let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    
    let searchResult = req.user.reminders.find(function (reminder) {
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

    databaseObj = req.user.reminders
    index = databaseObj.indexOf(searchResult)

    searchResult['title'] = title
    searchResult['description'] = description
    searchResult['completed'] = completed
    res.render("reminder/single-reminder", { reminderItem: searchResult });
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    databaseObj = req.user.reminders
    index = databaseObj.indexOf(searchResult)

    databaseObj.splice(index,1)
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
