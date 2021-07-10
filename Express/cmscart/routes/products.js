const express = require('express')
const router = express.Router()
// Get Page model
const Product = require('../models/product')
// Get Category model
const Category = require('../models/category')


// GET all products
router.get('/', (req, res) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err)
        } 
        res.render('all_products', {
            title: 'All products',
            products: products
        })
    })
})


// GET products by category
router.get('/:category', (req, res) => {

    let categorySlug = req.params.category

    Category.findOne({slug: categorySlug}, (err, c) => {
        Product.find({category: categorySlug}, (err, products) => {
            if (err) {
                console.log(err)
            } 
            res.render('cat_products', {
                title: c.title,
                products: products
            })
        })
    }) 
})


// Exports
module.exports = router