const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/database')

// Connect to db
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB')
});

// Init app
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Set public folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}...`)
})
