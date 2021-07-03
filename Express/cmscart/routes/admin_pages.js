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


// Exports
module.exports = router