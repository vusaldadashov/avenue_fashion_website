const Products = require('../models/shop')
const User = require('../models/auth')
exports.getHome = (req,res,next) => {
    Products.find().then(products => {
        res.render('index', {
        user: req.session.user,
        products: products
    })
    })
}
exports.getBrand = (req,res,next) => {
    res.render('brand', {
        user: req.session.user,
        pageTitleBold: 'THE',
        pageTitleLight: 'BRAND',
        pageSlogan: 'COMPANY SLOGAN GOES HERE'
    })
}
exports.getProduct = (req,res,next) => {
    Products.findOne({_id: req.params.productId}).then(product => {
    res.render('product', {
        product: product,
        user: req.session.user,
        pageTitleBold: 'PRODUCT',
        pageTitleLight: 'VIEW',
        pageSlogan: 'COMPANY SLOGAN GOES HERE'
    })
})
}
exports.getLookbook = (req,res,next) => {
    res.render('lookbook', {
        user: req.session.user,
        pageTitleBold: 'OUR',
        pageTitleLight: 'LOOKBOOK',
        pageSlogan: 'LATEST POSTS - MENS & WOMENS'
    })
}
exports.getStores = (req,res,next) => {
    res.render('stores', {
        user: req.session.user,
        pageTitleBold: 'LOCAL',
        pageTitleLight: 'STORES',
        pageSlogan: 'FIND A STORE NEAR YOU',
        storeName: req.params.storeName
    })
}

exports.getProfile = (req,res,next) => {
    res.render('profile',{
        user: req.session.user,
        pageTitleBold: 'MY',
        pageTitleLight: 'ACCOUNT'
    })
}
exports.getMensProds = (req,res,next) => {
    Products.find({tags : 'Men'}).then(prods => {
        res.render('index', {
            products: prods,
            user: req.session.user
        })
    })
    
}
exports.getWomensProds = (req,res,next) => {
    Products.find({tags : 'Women'}).then(prods => {
        res.render('index', {
            products: prods,
            user: req.session.user
        })
    })
}
exports.postAddToCart = (req,res,next) => {
    if(!req.session.isLoggedIn) {
        res.redirect('/login')
    }
    User.findOne({email: req.session.user.email}).then(user => {
        const prodItems = {
            id: req.body.prodId,
            name: req.body.prodName,
            price: {
                currentPrice: req.body.prodPrice
            },
            images: [req.body.prodImages],
            productColor: req.body.prodColor,
            productSize: req.body.prodSize,
            productQuantity: req.body.prodQuantity
        }
        user.cart.push(prodItems)
        req.session.user = user
        return user.save()
    })
    .then(() => {
        console.log('Added to cart');
        res.redirect('/')
    })
}

exports.getOrders = (req,res,next) => {
    res.render('orders', {
        user: req.session.user,
        pageTitleBold: 'MY',
        pageTitleLight: 'ORDERS',
        pageSlogan: 'GREAT CHANCES'
    })
}

exports.deleteOrder = (req,res,next) => {
    User.findById({_id:req.session.user._id}).then(user=> {
        user.cart.splice(req.params.productIndex,1)
        user.save()
        req.session.user = user
        console.log('order deleted');
        res.json({data: user.cart.length})
    })
    .catch(err => {
        res.json({ error: "Deleting process failed"})
        console.log(err);
    })
}
exports.deleteMyOrder = (req,res,next) => {
    User.findById({_id:req.session.user._id}).then(user=> {
        user.orders.splice(req.params.productIndex,1)
        user.save()
        req.session.user = user
        console.log('order deleted');
        res.json({data: user.orders.length})
    })
    .catch(err => {
        res.json({ error: "Deleting process failed"})
        console.log(err);
    })
}
exports.postOrders = (req,res,next) => {
    User.findById({ _id: req.session.user._id }).then(user => {
        const product = user.cart[req.body.productIndex]
        user.cart.splice(req.body.productIndex,1)
        user.orders.push(product)
        user.save()
        req.session.user = user
        res.redirect('/profile')
    })
}