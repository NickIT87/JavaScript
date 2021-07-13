const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
// Get Page model
const User = require('../models/user')


// GET register
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    })
})


// POST register
router.get('/register', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    let password2 = req.body.password2

    // ... 
    
    res.render('register', {
        title: 'Register'
    })
})


// Exports
module.exports = router