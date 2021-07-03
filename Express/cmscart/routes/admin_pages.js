const express = require('express')
const router = express.Router()

// GET Page model
const Page = require('../models/page')

// GET pages index
router.get('/', (req, res) => {
    Page.find({}).sort({sorting: 1}).exec((err, pages) => {
        res.render('admin/pages', {
            pages: pages
        })
    })
})

// GET add page
router.get('/add-page', (req, res) => {
    let title = ""
    let slug = ""
    let content = ""
    
    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    })
})

// POST add page and save to DB
router.post('/add-page', (req, res) => {
    
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();
    
    let title = req.body.title
    let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug == "") {
        slug = title.replace(/\s+/g, '-').toLowerCase()
    } 
    let content = req.body.content
    let errors = req.validationErrors();

    if (errors) {
        console.log('errors:', errors)
        res.render('admin/add_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        })
    } else {
        console.log('.../add-page req.post success')
        Page.findOne({slug: slug}, (err, page) => {
            if (err) {
                console.log("ERROR router/post", err)
            }
            if (page) {
                req.flash('danger', 'Page slug exists, choose another.')
                res.render('admin/add_page', {
                    title: title,
                    slug: slug,
                    content: content
                })
            } else {
                let page = new Page({
                    title: title,
                    slug: slug,
                    content: content,
                    sorting: 100
                })
                page.save((err) => {
                    if (err) 
                        return console.log(err)
                    req.flash('success', 'Page added!')
                    res.redirect('/admin/pages')
                })
            }
        })
    }
})


// Exports
module.exports = router