// const { model } = require('mongoose')
const mongoose = require('../db/connections')
const DateOnly = require('mongoose-dateonly')(mongoose);
const Schema = mongoose.Schema

const expensesSchema = new Schema({
    date: Date,
    category: String,
    amount: Number,
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ExpenseTracker = mongoose.model('Expenses', expensesSchema)

module.exports = ExpenseTracker