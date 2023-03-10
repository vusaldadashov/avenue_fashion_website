const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const multer = require('multer')
const flash = require('connect-flash')
const csrf = require('csurf')
const csrfProtection = csrf()
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const mongo_url = process.env.MONGO_URL
const mongoose = require('mongoose')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
const shoppingRoute = require('./routes/shopping')
const errorRoute = require('./routes/error')
app.set('view engine','ejs')
app.set('views','views')
mongoose.connect(mongo_url, {
    dbName: 'myFirstDatabase'
    ).then(()=> {
    console.log('connected');
})

const store = new MongoDbStore({
    uri: mongo_url,
    collection: 'sessions'
})
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'images')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
  });  

  app.use(
    multer({storage: fileStorage }).array('image', 5)
  );
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: store,
    unset : 'destroy'
  }))
app.use(csrfProtection)
app.use(flash())
app.use((req,res,next)=> {
    res.locals.isLoggedIn = req.session.isLoggedIn,
    res.locals.csrfToken = req.csrfToken()
    next()
})
app.use('/admin', adminRoute)
app.use(authRoute)
app.use(shoppingRoute)
//app.use(errorRoute)


app.listen(PORT)
