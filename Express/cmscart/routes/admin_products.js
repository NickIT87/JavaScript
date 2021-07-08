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
                            galleryImages: galleryImages
                        })
                    }
                })
            }
        })
    })
})


// // POST edit page
// router.post('/edit-page/:id', (req, res) => {
    
//     req.checkBody('title', 'Title must have a value.').notEmpty();
//     req.checkBody('content', 'Content must have a value.').notEmpty();
    
//     let title = req.body.title
//     let slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
//     if (slug == "") {
//         slug = title.replace(/\s+/g, '-').toLowerCase()
//     } 
//     let content = req.body.content
//     let id = req.params.id
//     let errors = req.validationErrors();

//     if (errors) {
//         console.log('errors:', errors)
//         res.render('admin/edit_page', {
//             errors: errors,
//             title: title,
//             slug: slug,
//             content: content,
//             id: id
//         })
//     } else {
//         //console.log('.../edit-page req.post success')
//         Page.findOne({slug: slug, _id: {'$ne': id}}, (err, page) => {
//             if (err) {
//                 console.log("ERROR router/post", err)
//             }
//             if (page) {
//                 req.flash('danger', 'Page slug exists, choose another.')
//                 res.render('admin/edit_page', {
//                     title: title,
//                     slug: slug,
//                     content: content,
//                     id: id
//                 })
//             } else {
//                 Page.findById(id, (err, page) => {
//                     if (err)
//                         return console.log(err)
//                     page.title = title
//                     page.slug = slug
//                     page.content = content

//                     page.save((err) => {
//                         if (err) 
//                             return console.log(err)
//                         req.flash('success', 'Page edited successful!')
//                         res.redirect('/admin/pages/edit-page/' + id)
//                     })
//                 })
//             }
//         })
//     }
// })


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