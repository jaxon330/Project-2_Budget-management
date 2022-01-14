// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const { PORT,   SESSION_SECRET } = process.env
const expressEjsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const ExpenseTracker = require('./models/expenses')
const expenseController = require('./controllers/expenseController')
const sessionsController = require('./controllers/sessions')
const filterController = require('./controllers/filterController')
const moment = require('moment')
// CONFIGURATION
const app = express()
const methodOverride = require('method-override')

app.use(express.static('public'))
app.use(methodOverride('_method'))
// app.use((req, res, next) => {
//     console.log('I run for all routes');
//     next()
// })
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')

// session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
}))


app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})

// middleware to require authentication
const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

// custom middleware for flash messaging
app.use((req, res, next) => {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})
 app.use('/expenses', authRequired, expenseController)
 app.use('/session', sessionsController)
 app.use('/expenses', authRequired, filterController)

// app.get('/', (req, res) => {
//     res.send('Hello')
// })

app.listen(3000, () => {
    console.log('Server is running on port ' + PORT);
})