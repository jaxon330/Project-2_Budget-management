const mongoose = require('./connections')
const ExpenseTracker = require('../models/expenses')
const User = require('../models/user')
const seeds = require('./expensesSeeds.json')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)


ExpenseTracker.deleteMany({})
  .then(() => User.deleteMany({}))
  .then(() => {
    return User.create({ username: process.env.USERNAME, password: bcrypt.hashSync(process.env.PASSWORD, salt)})
      .then((user) =>
      seeds.map((expense) => ({ ...expense, owner: user._id }))
      )
      .then((expenses) => {
          return ExpenseTracker.insertMany(expenses)
      });
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
