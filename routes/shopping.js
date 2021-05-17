const express = require('express')
const router = express.Router()

const shopControl = require('../controllers/shopcontrol')

router.get('/', shopControl.getHome)
router.get('/product/:productId', shopControl.getProduct)
router.get('/stores/:storeName', shopControl.getStores)
router.get('/lookbook', shopControl.getLookbook)
router.get('/brand', shopControl.getBrand)
router.get('/profile',shopControl.getProfile)

router.get('/mens',shopControl.getMensProds)

router.get('/womens', shopControl.getWomensProds)
router.get('/orders', shopControl.getOrders)

router.post('/postorder',shopControl.postOrders)

router.delete('/deleteorder/:productIndex', shopControl.deleteOrder)



router.post('/addtocart', shopControl.postAddToCart)
module.exports = router