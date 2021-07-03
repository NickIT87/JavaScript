const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send("admin area")
})


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
    }
        
})


// Exports
module.exports = router