const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('./config/database')
const session = require('express-session')
const expressValidator = require('express-validator')
const fileUpload = require('express-fileupload')


// Connect to db
mongoose.connect(config.database, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Connected to MongoDB')
})

// Init app
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Set public folder
app.use(express.static(path.join(__dirname, 'public')))

// Set global errors variable
app.locals.errors = null

// Get Page model
const Page = require('./models/page')

// Get all pages to pass header.ejs
Page.find({}).sort({sorting: 1}).exec((err, pages) => {
    if (err) {
        console.log(err)
    } else {
        app.locals.pages = pages
    }
})

// Get Category model
const Category = require('./models/category')

// Get all categories to pass to header.ejs
Category.find((err, categories) => {
    if (err) {
        console.log(err)
    } else {
        app.locals.categories = categories
    }
})

// Express fileUpload middleware
app.use(fileUpload())

// Body parser deprecated - express middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
}))

// Express Validator middleware
// npm uninstall express-validator
// npm install express-validator@5.3.1
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    },
    customValidators: {
        isImage: function(value, filename) {
            let extension = (path.extname(filename)).toLowerCase()
            switch(extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                        return '.jpg';
                default:
                    return false;
            }
        }
    }
}))

// Express Messages middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next();
})

app.get('*', (req, res, next) => {
    res.locals.cart = req.session.cart
    next()
})

// Set routes
const pages = require('./routes/pages.js')
const products = require('./routes/products.js')
const cart = require('./routes/cart.js')
const adminPages = require('./routes/admin_pages.js')
const adminCategories = require('./routes/admin_categories.js')
const adminProducts = require('./routes/admin_products.js')

app.use('/admin/pages', adminPages)
app.use('/admin/categories', adminCategories)
app.use('/admin/products', adminProducts)
app.use('/products', products)
app.use('/cart', cart)
app.use('/', pages)


// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}...`)
})
