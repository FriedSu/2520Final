let database = require("../database");
const fetch = require('node-fetch');
const defaultImage = "https://images.unsplash.com/photo-1512314889357-e157c22f938d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"

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

    const client_id = "5KYLCV-t8M0QIWlH81bE-QA3ZzrMZIrx_wiMo1GYNwA"
    const query = req.body.image
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}`)
    .then(res => res.json())
    .then(json => {
      let randomNumber = 1
      queryImage = json.results[randomNumber].urls.small

      let reminder = {
        id: req.user.reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        image: queryImage,
        imageName: req.body.image
      };
      req.user.reminders.push(reminder);
      res.redirect("/reminders")})
    .catch((err) => {
      queryImage = defaultImage

      let reminder = {
        id: req.user.reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        image: queryImage,
        imageName: req.body.image
      };
      req.user.reminders.push(reminder);
      res.redirect("/reminders")
    })
    
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {

    const client_id = "5KYLCV-t8M0QIWlH81bE-QA3ZzrMZIrx_wiMo1GYNwA"
    const query = req.body.image
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}`)
    .then(res => res.json())
    .then(json => {
      let randomNumber = 1
      queryImage = json.results[randomNumber].urls.small

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
      searchResult['image'] = queryImage
      searchResult['imageName'] = req.body.image
      res.render("reminder/single-reminder", { reminderItem: searchResult });
      
    })
    .catch((err) => {
      queryImage = defaultImage

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
      searchResult['image'] = queryImage
      searchResult['imageName'] = req.body.image
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    });
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
