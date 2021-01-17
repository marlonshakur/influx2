const mongoose = require('mongoose')
const blogpost = require('./models/blogpost')
const {
    static
} = require('express')
const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs')
const bodyParser =
require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const {
    use
} = require('browser-sync')
const { data } = require('jquery')
app.set('view engine', 'ejs')
app.use(static('./public'))
// CONNECTION TO MONGODB DATABASE CLOUD SERVER 
const connectionstring = 'mongodb+srv://amr:amr123@cluster0.v8k3k.mongodb.net/influx?retryWrites=true&w=majority'
mongoose.connect(connectionstring, {
    useNewUrlParser: true
},{ useUnifiedTopology: true }, (err, data) => {
    console.log(err)
})
app.listen(4000)
const homepage = path.resolve(__dirname, './views/index.html')
const about = path.resolve(__dirname, './views/about.html')
const post = path.resolve(__dirname, './views/post.html')
const contact = path.resolve(__dirname, './views/contact.html')

app.get('/', async (req, res) => {
    const blogposts = await blogpost.find({}, function(err,data){})
    console.log('the user requested : ' + req.url)
    console.log(blogposts)
    res.render('index',{blogposts:blogposts})
})
app.get('/about', (req, res) => {
    console.log('the user requested : ' + req.url)
    res.render('about')
})
app.get('/post', (req, res) => {
    console.log('the user requested : ' + req.url)
    res.render('post')
})
app.get('/contact', (req, res) => {
    console.log('the user requested : ' + req.url)
    res.render('contact')
})

app.get('/posts/new',(req,res)=>{
    console.log(req.url)
    res.render('create')
})
app.post('/posts/store',async(req,res)=>{
    await blogpost.create(req.body,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
    res.redirect('/')
    })
    app.post('/search',async(req,res)=>{
        await blogpost.find(req.body,(err,data)=>{
            console.log(err,data.values)
        })

    })