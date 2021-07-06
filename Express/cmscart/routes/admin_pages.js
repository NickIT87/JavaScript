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
        //console.log('.../add-page req.post success')
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


// POST reorder pages
router.post('/reorder-pages', (req, res) => {
    //console.log(req.body)
    let ids = req.body['id[]']
    let count = 0;

    for (let i = 0; i < ids.length; i++) {
        let id = ids[i]
        count++
        // node async for reorder pages
        (function(count) {
            Page.findById(id, (err, page) => {
                if (err) {
                    console.log("ERROR POST reorder pages: ", err)
                }
                page.sorting = count
                page.save((err) => {
                    if (err) {
                        return console.log(err)
                    }
                })
            })
        })(count);
    }
})


// GET edit page
router.get('/edit-page/:id', (req, res) => {
    
    Page.findById(req.params.id, (err, page) => {
        if (err)
            return console.log(err)

        res.render('admin/edit_page', {
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id
        })
    })
})


// POST edit page
router.post('/edit-page/:id', (req, res) => {
    
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();
    
    let title = req.body.title
    let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug == "") {
        slug = title.replace(/\s+/g, '-').toLowerCase()
    } 
    let content = req.body.content
    let id = req.params.id
    let errors = req.validationErrors();

    if (errors) {
        console.log('errors:', errors)
        res.render('admin/edit_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content,
            id: id
        })
    } else {
        //console.log('.../edit-page req.post success')
        Page.findOne({slug: slug, _id: {'$ne': id}}, (err, page) => {
            if (err) {
                console.log("ERROR router/post", err)
            }
            if (page) {
                req.flash('danger', 'Page slug exists, choose another.')
                res.render('admin/edit_page', {
                    title: title,
                    slug: slug,
                    content: content,
                    id: id
                })
            } else {
                Page.findById(id, (err, page) => {
                    if (err)
                        return console.log(err)
                    page.title = title
                    page.slug = slug
                    page.content = content

                    page.save((err) => {
                        if (err) 
                            return console.log(err)
                        req.flash('success', 'Page edited successful!')
                        res.redirect('/admin/pages/edit-page/' + id)
                    })
                })
            }
        })
    }
})


// GET delete page
router.get('/delete-page/:id', (req, res) => {
    Page.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            return console.log(err)
        req.flash('success', 'Page deleted!')
        res.redirect('/admin/pages/')
    })
})


// Exports
module.exports = router