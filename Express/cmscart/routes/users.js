const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
// Get Page model
const Users = require('../models/user')


// GET register
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    })
})


// Exports
module.exports = router