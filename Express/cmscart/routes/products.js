const express = require('express')
const router = express.Router()
const fs = require('fs-extra')
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


// GET product details
router.get('/:category/:product', (req, res) => {
    let galleryImages = null;
    let loggedIn = req.isAuthenticated() ? true : false
    
    Product.findOne({slug: req.params.product}, (err, product) => {
        if (err) {
            console.log(err)
        } else {
            let galleryDir = 'public/product_images/' + product._id + '/gallery'

            fs.readdir(galleryDir, (err, files) => {
                if (err) {
                    console.log(err)
                } else {
                    galleryImages = files
                    res.render('product', {
                        title: product.title,
                        p: product,
                        galleryImages: galleryImages,
                        loggedIn: loggedIn
                    })
                }
            })
        }
    })
})


// Exports
module.exports = router