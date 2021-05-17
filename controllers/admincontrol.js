const Product = require('../models/shop')
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
exports.getAdminLogin = (req,res,next) => {
    res.render('admin/syslogin')
}
exports.postAdminLogin = (req,res,next) => {
    console.log('yes');
    const email = req.body.email
    const password = req.body.password
    Admin.findOne({email:email}).then(admin=> {
        if(!admin) {
            req.flash('error', 'Email or password is incorrect!')
            return res.redirect('/admin/login')
        }
        // bcrypt.compare(admin.password, password).then(result => {
        //     if(!result) {
        //         req.flash('error','Email or password is incorrect!')
        //         return res.redirect('/admin/login')
        //     }
        //     res.redirect('/admin/system' + admin._id)
        //     req.session.admin = admin
        // })
        if(admin.password === password) {
            req.session.admin = admin
            return res.redirect('/admin/system/' + admin._id)
        }
        req.flash('error', 'Email or password is incorrect')
        res.redirect('/admin/login')
    })
}

exports.postProduct = (req,res,next) => {
    const images = req.files
    const body = req.body
    const paths = []
    for(let i=0;i< images.length;i++) {
        paths[i] = images[i].path.replace(/\\/g, "/").replace('images','')
    }
    const newProduct = new Product({
        name: body.name,
        code: "25S",
        price: { 
            currentPrice: body.price 
        },
        tags: body.tags,
        description: body.description,
        qualities: body.qualities,
        images: paths
    })
    newProduct.save()
    .then(()=> {
        console.log('saved');
         res.redirect('/admin')
    })
    .catch(err => {
        console.log(err);
        res.redirect('/admin')
    })
    
}
exports.getSystemPage = (req,res,next) => {
    res.render('admin/system')
}