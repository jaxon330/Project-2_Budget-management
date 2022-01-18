// const { model } = require('mongoose')
const mongoose = require('../db/connections')
const DateOnly = require('mongoose-dateonly')(mongoose);
const Schema = mongoose.Schema

const expensesSchema = new Schema({
    date: {type: Date, required: true},
    category: String,
    amount: {type: Number, min: 0, required: true},
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ExpenseTracker = mongoose.model('Expenses', expensesSchema)

module.exports = ExpenseTracker