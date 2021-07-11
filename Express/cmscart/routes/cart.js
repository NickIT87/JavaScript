const express = require('express')
const router = express.Router()
// Get Product model
const Product = require('../models/product')


// GET add product to cart
router.get('/add/:product', (req, res) => {
    let slug = req.params.product

    Product.findOne({slug: slug}, (err, p) => {
        if (err) {
            console.log(err)
        }
        if (typeof req.session.cart == "undefined") {
            req.session.cart = []
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: parseFloat(p.price).toFixed(2),
                image: '/product_images/' + p.id + '/' + p.image
            })
        } else {
            let cart = req.session.cart
            let newItem = true
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].title == slug) {
                    cart[i].qty++
                    newItem = false
                    break
                }
            }
            if (newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2),
                    image: '/product_images/' + p.id + '/' + p.image
                })
            }
        }
        //console.log(req.session.cart)
        req.flash('success', 'Product added!')
        res.redirect('back')
    })
})


// GET checkout view page
router.get('/checkout', (req, res) => {
    res.render('checkout', {
        title: 'Checkout',
        cart: req.session.cart
    })
})


// Exports
module.exports = router