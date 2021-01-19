const newPostController = require('./Controllers/newPost')
const homeController = require('./Controllers/home')
const aboutController = require('./Controllers/about')
const samplePostController = require('./Controllers/samplePostController')
const singlePageController = require('./Controllers/singlePagePost')
const contactController = require('./Controllers/contact')
const storePostController = require('./Controllers/storePost.js')
const searchController = require('./Controllers/search')
const validationMiddleware = require('./middleware/validationMiddleware')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const {static} = require('express')
const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
const {use} = require('browser-sync')
const {data} = require('jquery')
app.set('view engine', 'ejs')
app.use(static('./public'))
app.use(fileUpload())
app.use('/posts/store',validationMiddleware)
// CONNECTION TO MONGODB DATABASE CLOUD SERVER 
//__________________________________________________________________________________________________________________________________
const connectionstring = 'mongodb+srv://amr:amr123@cluster0.v8k3k.mongodb.net/influx?retryWrites=true&w=majority'
mongoose.connect(connectionstring, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, data) => {
    if(err){console.log(err)}
})
//__________________________________________________________________________________________________________________________________
app.listen(4000)
app.get('/',homeController)
app.get('/about',aboutController)
app.get('/post',samplePostController)
app.get('/post/:id', singlePageController)
app.get('/contact',contactController)
app.get('/posts/new',newPostController)
app.post('/posts/store',storePostController)
//INDEX - show all campgrounds
app.get("/search",searchController) 