const express = require('express')
const router = express.Router()
const mkdrp = require('mkdirp')
const fs = require('fs-extra')
const resizeImg = require('resize-img')

// GET Product model
const Product = require('../models/product')
// GET Category model
const Category = require('../models/category')


// GET products index
router.get('/', (req, res) => {
    let count
    // Product.count is deprecated. USE: '.estimatedDocumentCount' or '.countDocuments'
    Product.estimatedDocumentCount((err, c) => {
        count = c
    })
    Product.find((err, products) => {
        res.render('admin/products', {
            products: products,
            count: count
        })
    })
})

// GET add product
router.get('/add-product', (req, res) => {
    let title = ""
    let desc = ""
    let price = ""
    
    Category.find((err, categories) => {
        res.render('admin/add_product', {
            title: title,
            desc: desc,
            categories: categories,
            price: price
        })
    })
})

// POST add product and save to DB
router.post('/add-product', (req, res) => {
    
    let imageFile = ""
    if (req.files && typeof req.files.image !== "undefined"){
        imageFile = req.files.image.name;    
    }
    
    req.checkBody('title', 'Title must have a value.').notEmpty()
    req.checkBody('desc', 'Description must have a value.').notEmpty()
    req.checkBody('price', 'Price must have a value.').isDecimal()
    req.checkBody('image', 'You must upload an image').isImage(imageFile)
    
    let title = req.body.title
    let slug = title.replace(/\s+/g, '-').toLowerCase()
    let desc = req.body.desc
    let price = req.body.price
    let category = req.body.category
    let errors = req.validationErrors()

    if (errors) {
        console.log('errors:', errors)
        Category.find((err, categories) => {
            res.render('admin/add_product', {
                errors: errors,
                title: title,
                desc: desc,
                categories: categories,
                price: price
            })
        })
    } else {
        //console.log('.../add-page req.post success')
        Product.findOne({slug: slug}, (err, product) => {
            if (err) {
                console.log("ERROR admin_products/post add-product", err)
            }
            if (product) {
                req.flash('danger', 'Product title exists, choose another.')
                Category.find((err, categories) => {
                    res.render('admin/add_product', {
                        title: title,
                        desc: desc,
                        categories: categories,
                        price: price
                    })
                })
            } else {
                let price2 = parseFloat(price).toFixed(2)
                let product = new Product({
                    title: title,
                    slug: slug,
                    desc: desc,
                    price: price2,
                    category: category,
                    image: imageFile
                })
                product.save((err) => {
                    if (err) 
                        return console.log(err)

                    mkdrp('public/product_images/' + product._id, (err) => {
                        return console.log(err)
                    })
                    mkdrp('public/product_images/' + product._id + '/gallery', (err) => {
                        return console.log(err)
                    })
                    mkdrp('public/product_images/' + product._id + '/gallery/thumbs', (err) => {
                        return console.log(err)
                    })

                    if (imageFile != "") {
                        let productImage = req.files.image
                        let path = 'public/product_images/' + product._id + '/' + imageFile
                        productImage.mv(path, (err) => {
                            return console.log(err)
                        })
                    }
                    req.flash('success', 'Product added!')
                    res.redirect('/admin/products')
                })
            }
        })
    }
})


// GET edit product
router.get('/edit-product/:id', (req, res) => {
    
    let errors;
    if (req.session.errors) 
        errors = req.session.errors
    req.session.errors = null

    Category.find((err, categories) => {
        Product.findById(req.params.id, (err, p) => {
            if (err) {
                console.log(err);
                res.redirect('/admin/products')
            } else {
                let galleryDir = 'public/product_images/' + p._id + '/gallery'
                let galleryImages = null
                fs.readdir(galleryDir, (err, files) => {
                    if (err) {
                        console.log(err)
                    } else {
                        galleryImages = files

                        res.render('admin/edit_product', {
                            title: p.title,
                            errors: errors,
                            desc: p.desc,
                            categories: categories,
                            category: p.category.replace(/\s+/g, '-').toLowerCase(),
                            price: p.price,
                            image: p.image,
                            galleryImages: galleryImages,
                            id: p._id
                        })
                    }
                })
            }
        })
    })
})


// POST edit product
router.post('/edit-product/:id', (req, res) => {
    let imageFile = ""
    if (req.files && typeof req.files.image !== "undefined"){
        imageFile = req.files.image.name;    
    }
    
    req.checkBody('title', 'Title must have a value.').notEmpty()
    req.checkBody('desc', 'Description must have a value.').notEmpty()
    req.checkBody('price', 'Price must have a value.').isDecimal()
    req.checkBody('image', 'You must upload an image').isImage(imageFile)
    
    let title = req.body.title
    let slug = title.replace(/\s+/g, '-').toLowerCase()
    let desc = req.body.desc
    let price = req.body.price
    let category = req.body.category
    let pimage = req.body.pimage
    let id = req.params.id
    let errors = req.validationErrors()

    if (errors) {
        req.session.errors = errors
        res.redirect('/admin/products/edit-product/' + id)
    } else {
        Product.findOne({slug: slug, _id:{'$ne':id}}, (err, p) => {
            if (err)
                console.log(err)
            
            if (p) {
                req.flash('danger', 'Product title exists, choose another.')
                res.redirect('/admin/products/edit-product/' + id)
            } else {
                Product.findById(id, (err, p) => {
                    if (err)
                        console.log(err)
                    
                    p.title = title
                    p.slug = slug
                    p.desc = desc
                    p.price = parseFloat(price).toFixed(2)
                    p.category = category
                    if (imageFile != "") {
                        p.image = imageFile
                    }
                    p.save((err) => {
                        if (err)
                            console.log(err)

                        if (imageFile != "") {
                            if (pimage != "") {
                                fs.remove('public/product_images/' + id + '/' + pimage, (err) => {
                                    if (err)
                                        console.log(err)
                                    
                                })
                            }
                            let productImage = req.files.image
                            let path = 'public/product_images/' + id + '/' + imageFile
                            productImage.mv(path, (err) => {
                                return console.log(err)
                            })                        
                        }
                        req.flash('success', 'Product edited.')
                        res.redirect('/admin/products/edit-product/' + id)
                    })
                })
            }
        })
    }
})


// // GET delete page
// router.get('/delete-page/:id', (req, res) => {
//     Page.findByIdAndRemove(req.params.id, (err) => {
//         if (err)
//             return console.log(err)
//         req.flash('success', 'Page deleted!')
//         res.redirect('/admin/pages/')
//     })
// })


// Exports
module.exports = router