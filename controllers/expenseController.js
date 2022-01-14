const express = require('express')
var moment = require('moment');
const router = express.Router()
const ExpenseTracker = require('../models/expenses')
const seeds = require('../db/expensesSeeds.json')
const { json } = require('express/lib/response')

let totalExpenses = 0
let totalIncomes = 0
let balance = 0

// ExpenseTracker.insertMany(seeds, (err, data) => {
//     if(err) {console.log(err);}
//     console.log(data)
// })

// ExpenseTracker.deleteMany({}, (err, data) => {
//     if(err) {console.log(err);}
//     console.log(data)
// })

// Index route
router.get('/', (req, res) => {
    ExpenseTracker.find({
        owner: req.session._id
    }, (err, data) => {
        // total income
        let totalIncomes = data?.filter((item) => item.category === 'Income').reduce((acc, item) => {
            return acc + item.amount
        }, 0).toFixed(2);

        // total Expenses
        let totalExpenses = data?.filter((item) => item.category !== 'Income').reduce((acc, item) => {
            return acc + item.amount
        }, 0).toFixed(2)

        // Balance
        let balance = (totalIncomes - totalExpenses).toFixed(2)
        let date = data.map(item => item.date)

        res.render('index', {
            expenses: data,
            username: req.session.username,
            incomes: totalIncomes,
            totalExpenses: totalExpenses,
            balance: balance
        })
    }).sort({
        date: -1
    })
})

// new route
router.get('/new', (req, res) => {
    res.render('new')
})

// Create route
router.post('/', (req, res) => {
    req.body.owner = req.session._id
    ExpenseTracker.create(req.body, (err, data) => {
        console.log(data);
        res.redirect('/expenses')
    })
})

// Search route
router.post('/search', (req, res) => {
    req.body.owner = req.session._id
    ExpenseTracker.find({}, (err, data) => {
        // total income
        totalIncomes = data?.filter((item) => item.category === 'Income').reduce((acc, item) => {
            return acc + item.amount
        }, 0).toFixed(2);

        // total Expenses
        totalExpenses = data?.filter((item) => item.category !== 'Income').reduce((acc, item) => {
            return acc + item.amount
        }, 0).toFixed(2)

        // Balance
        balance = (totalIncomes - totalExpenses).toFixed(2)
        ExpenseTracker.find({
            category: {
                $regex: req.body.search
            },
            owner: req.body.owner
        }, (err, data) => {

            // console.log(data);
            res.render('index', {
                expenses: data?.map(item => {
                    item.date = new Date(item.date).toLocaleDateString()
                    return item
                }),
                // username: req.session.username,
                incomes: totalIncomes,
                totalExpenses: totalExpenses,
                balance: balance
            })
        }).sort({
            date: -1
        })
    })
})


// show route
router.get('/:id', (req, res) => {
    ExpenseTracker.findById(req.params.id, (err, data) => {
        res.render('show', {
            expense: data
        })
    })
})


// Delete route
router.delete('/:id', (req, res) => {
    ExpenseTracker.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/expenses')
        console.log('item was deleted')

    })
})

// Edit route
router.put('/:id', (req, res) => {
    ExpenseTracker.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, updatedItem) => {
        res.redirect('/expenses')
    })
})

router.get('/:id/edit', (req, res) => {
    ExpenseTracker.findById(req.params.id, (err, updatedItem) => {
        res.render('edit', {
            expense: updatedItem
        })
    })
})



 
    //  db.expenses.aggregate([
    //      {$project: {date: {$month: '$date'}}}, {$match: {date: 12}}
    //  ]).pretty()


module.exports = router