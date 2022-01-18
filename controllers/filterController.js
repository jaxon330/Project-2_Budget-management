    const express = require('express')
    const router = express.Router()
    const ExpenseTracker = require('../models/expenses')

    let totalExpenses = 0
    let totalIncomes = 0
    let balance = 0



    /* ----------------------------------Filter by current date and week------------------------------------- */

    router.get('/filter/:day', (req, res) => {

        const num = req.params.day
        if (num === 1) {
            document.getElementById('24h').style.backgroundColor = 'red';
        }
        req.body.owner = req.session._id

            ExpenseTracker.find({
                    date: {
                        $gte: new Date(new Date() - parseInt(num) * 60 * 60 * 24 * 1000).toISOString().split('T')[0]
                    },
                    owner: req.body.owner
                }, (err, data) => {
                                // total income
            totalIncomes = data?.filter((item) => item.category === 'Income').reduce((acc, item) => {
                return acc + item.amount
            }, 0).toFixed(2);

            // total Expenses
            totalExpenses = data?.filter((item) => item.category !== 'Income').reduce((acc, item) => {
                return acc + item.amount
            }, 0).toFixed(2);

            // Balance
            balance = (totalIncomes - totalExpenses).toFixed(2);
                    res.render('index', {
                        expenses: data,
                        incomes: totalIncomes,
                        totalExpenses: totalExpenses,
                        balance: balance
                    })
                })
                .sort({
                    date: -1
                })
        
    })




    /* ----------------------------------Filter monthly ------------------------------------- */

    router.get('/month/:number', (req, res) => {
        let month = req.params.number
        req.body.owner = req.session._id

            ExpenseTracker.aggregate([{
                        $project: {
                            category: 1,
                            date: 1,
                            amount: 1,
                            description: 1,
                            newDate: {
                                $month: '$date'
                            }
                        }
                    }, {
                        $match: {
                            newDate: parseInt(month)
                        }
                    }],


                    (err, data) => {
                                    // total income
            totalIncomes = data?.filter((item) => item.category === 'Income').reduce((acc, item) => {
                return acc + item.amount
            }, 0).toFixed(2);

            // total Expenses
            totalExpenses = data?.filter((item) => item.category !== 'Income').reduce((acc, item) => {
                return acc + item.amount
            }, 0).toFixed(2);

            // Balance
            balance = (totalIncomes - totalExpenses).toFixed(2);
                        res.render('index', {
                            expenses: data,
                            incomes: totalIncomes,
                            totalExpenses: totalExpenses,
                            balance: balance
                        })
                    })
                .sort({
                    date: -1
                })
      
    })



    /* ----------------------------------Filter yearly ------------------------------------- */

    router.get('/year/:year', (req, res) => {
        let year = req.params.year
        req.body.owner = req.session._id

            ExpenseTracker.aggregate([{
                        $project: {
                            category: 1,
                            date: 1,
                            amount: 1,
                            description: 1,
                            year: {
                                $year: '$date'
                            }
                        }
                    }, {
                        $match: {
                            year: parseInt(year)
                        }
                    }],


                    (err, data) => {
                                    // total income
            totalIncomes = data?.filter((item) => item.category === 'Income').reduce((acc, item) => {
                return acc + item.amount
            }, 0).toFixed(2);

            // total Expenses
            totalExpenses = data?.filter((item) => item.category !== 'Income').reduce((acc, item) => {
                return acc + item.amount
            }, 0).toFixed(2);

            // Balance
            balance = (totalIncomes - totalExpenses).toFixed(2);

                        res.render('index', {
                            expenses: data,
                            incomes: totalIncomes,
                            totalExpenses: totalExpenses,
                            balance: balance
                        })
                    })
                .sort({
                    date: -1
                })
       
    })



    module.exports = router