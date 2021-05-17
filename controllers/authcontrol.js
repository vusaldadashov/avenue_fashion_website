const User = require('../models/auth')
const bcrypt = require('bcrypt')
exports.getLogin = (req,res,next) => {
    res.render('signup', {
        isLogin: 'signin',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        pageTitleBold: 'WELCOME',
        pageTitleLight: 'TO AVE',
        pageSlogan: 'SIGN IN',
        errorMessage: req.flash('error')
    })
}
exports.getSignup = (req,res,next) => {
    res.render('signup',{
        isLogin: 'signup',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        pageTitleBold: 'WELCOME',
        pageTitleLight: 'TO AVE',
        pageSlogan: 'SIGN UP',
        errorMessage: req.flash('error')
    })
}
exports.postSignup = (req,res,next) => {
    const body = req.body
    User.findOne({email: body.email}).then(user => {
        if(user) {
            req.flash('error', 'There is an account with this email')
            return res.redirect('/signup')
        }
        bcrypt.hash(body.password, 12,).then(hashedPass => {
        const newUser = new User({
        name: body.name,
        surname: body.surname,
        username: body.username,
        email: body.email,
        password: hashedPass
        })
        newUser.save().then(()=>{
            console.log('User Registered');
        })
    })
    res.redirect('/login')
    })
    
}
exports.postLogin = (req,res,next) =>  {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email:email}).then(user=> {
        if(!user) {
            req.flash('error', 'Invalid email or password!')
            
            return res.redirect('/login')
        } 
        bcrypt.compare(password,user.password).then(result => {
            if(result) {
                req.session.isLoggedIn = true
                req.session.user = user
                return res.redirect('/')
            }
            req.flash('error', 'Password is not correct!')
            res.redirect('/login')
        })
    })
}
exports.logout = (req,res,next) => {
    req.session.destroy()
    
    res.redirect('/')
}

exports.resetPassword = (req,res,next) => {
    res.render('signup',{
        isLogin: 'reset',
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
        pageTitleBold: 'WELCOME',
        pageTitleLight: 'TO AVE',
        pageSlogan: 'RESET PASSWORD',
        errorMessage: req.flash('error')
    })
}

exports.postResetPassword = (req,res,next) => {
    User.findOne({email: req.body.email}).then(user=> {
        if(!user) {
            req.flash('error', "Can't find this user. Please check email again")
            return res.redirect('/resetpassword')
        }
        res.send.status(422).ren
    })
}
exports.updateUser = (req,res,next) => {
    User.findById({_id: req.session.user._id}).then(user=> {
        if(!user) {
            return res.json({message: 'failed'})
        }
        user.name = req.body.name,
        user.surname = req.body.surname,
        user.email = req.body.email
        user.postalCode = req.body.postalCode
        user.address = req.body.address
        user.phone = req.body.phone
        user.save()
        req.session.user = user
        res.json({message: 'success'})
    })
}