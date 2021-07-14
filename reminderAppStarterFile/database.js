let database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "jimmy123@gmail.com",
      password: "jimmy123!",
      reminders: [{id: 1, title: "Attend Johhny's Wedding", description: "bring best man speech", completed: false}],
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "johnny123@gmail.com",
      password: "johnny123!",
      reminders: [{id: 2, title: "Haircut", description: "Get a haircut before the wedding", completed: false}],
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
      reminders: [{id: 1, title: "Jimmy | Best man speech", description: "remind Jimmy about the best man speech", completed: false}],
    },
  ];

module.exports = database;