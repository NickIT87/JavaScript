const express = require('express')
const router = express.Router()

// GET Category model
const Category = require('../models/category')


// GET category index
router.get('/', (req, res) => {
    Category.find((err, categories) => {
        if (err)
            return console.log(err)
        res.render('admin/categories', {
            categories: categories
        })
    })
})


// GET add category
router.get('/add-category', (req, res) => {
    let title = ""
    res.render('admin/add_category', {
        title: title,
    })
})


// POST add category and save to DB
router.post('/add-category', (req, res) => {
    
    req.checkBody('title', 'Title must have a value.').notEmpty();
        
    let title = req.body.title
    let slug = title.replace(/\s+/g, '-').toLowerCase();
    
    let errors = req.validationErrors();

    if (errors) {
        console.log('errors:', errors)
        res.render('admin/add_category', {
            errors: errors,
            title: title
        })
    } else {
        //console.log('.../add-page req.post success')
        Category.findOne({slug: slug}, (err, category) => {
            if (err) {
                console.log("ERROR add-category router/post", err)
            }
            if (category) {
                req.flash('danger', 'Category title exists, choose another.')
                res.render('admin/add_category', {
                    title: title
                })
            } else {
                let category = new Category({
                    title: title,
                    slug: slug
                })
                category.save((err) => {
                    if (err) { 
                        return console.log(err)
                    }
                    Category.find((err, categories) => {
                        if (err) {
                            console.log(err)
                        } else {
                            req.app.locals.categories = categories
                        }
                    })
                    req.flash('success', 'Category added!')
                    res.redirect('/admin/categories')
                })
            }
        })
    }
})


// GET edit category
router.get('/edit-category/:id', (req, res) => {
    
    Category.findById(req.params.id, (err, category) => {
        if (err)
            return console.log(err)

        res.render('admin/edit_category', {
            title: category.title,
            id: category._id
        })
    })
})


// POST edit category
router.post('/edit-category/:id', (req, res) => {
    
    req.checkBody('title', 'Title must have a value.').notEmpty();
        
    let title = req.body.title
    let slug = title.replace(/\s+/g, '-').toLowerCase();
    let id = req.params.id
    let errors = req.validationErrors();

    if (errors) {
        console.log('errors:', errors)
        res.render('admin/edit_category', {
            errors: errors,
            title: title,
            id: id
        })
    } else {
        Category.findOne({slug: slug, _id: {'$ne': id}}, (err, category) => {
            if (err) {
                console.log("ERROR edit-category router/post", err)
            }
            if (category) {
                req.flash('danger', 'Category title exists, choose another.')
                res.render('admin/edit_category', {
                    title: title,
                    id: id
                })
            } else {
                Category.findById(id, (err, category) => {
                    if (err)
                        return console.log(err)
                    category.title = title
                    category.slug = slug

                    category.save((err) => {
                        if (err) {
                            return console.log(err)
                        }
                        Category.find((err, categories) => {
                            if (err) {
                                console.log(err)
                            } else {
                                req.app.locals.categories = categories
                            }
                        })
                        req.flash('success', 'Category edited successful!')
                        res.redirect('/admin/categories/edit-category/' + id)
                    })
                })
            }
        })
    }
})


// GET delete category
router.get('/delete-category/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return console.log(err)
        }
        Category.find((err, categories) => {
            if (err) {
                console.log(err)
            } else {
                req.app.locals.categories = categories
            }
        })
        req.flash('success', 'Category deleted!')
        res.redirect('/admin/categories/')
    })
})


// Exports
module.exports = router