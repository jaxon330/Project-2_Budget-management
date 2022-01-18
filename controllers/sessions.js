const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('session controller workss')
})

router.get('/register', (req, res) => {
    res.render('sessions/register.ejs')
})

router.post('/register', async (req, res, next) => {
    try {
        if (req.body.password === req.body.verifyPassword) {
            const desireUsername = req.body.username
            const userExists = await User.findOne({ username: desireUsername})
            if (userExists) {
                req.session.message = 'Username alredy taken'
                res.redirect('/session/register')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createUser = await User.create(req.body)
                req.session.username = createUser.username
                req.session._id = createUser._id
                req.session.loggedIn = true
                res.redirect('/expenses')
            }
        } else {
            req.session.message = 'Password must match'
            res.redirect('/session/register')
        }
    } catch (err) {
        next(err)
    }
})


// Login route
router.get('/login', (req, res) => {
    res.render('sessions/login.ejs')
})

router.post('/login', async (req, res, nest) => {
    try { 
        const userToLogin = await User.findOne({username: req.body.username})
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                req.session.username = userToLogin.username
                req.session._id = userToLogin._id
                req.session.loggedIn = true
                res.redirect('/expenses')
               
            } else {
                req.session.message = 'Invalid username or password'
                res.redirect('/session/login')
            }
            
        } else {
            req.session.message = 'Invalid username or password'
            res.redirect('/session/login')
        }
    } catch (err) {
        next(err)
    }
})

// Logout route

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/session/login')
})

module.exports = router