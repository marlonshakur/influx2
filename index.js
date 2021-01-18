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
    res.render('index',{blogposts:blogposts})
})
app.get('/about', (req, res) => {
    console.log('the user requested : ' + req.url)
    res.render('about')
})
app.get('/post',(req,res)=>{
    res.render('sample')
})
app.get('/post/:id', async(req, res) => {
const blogpostss= await blogpost.findById((req.params.id),(err,x)=>{
console.log(err,x)
})
res.render('post',{blogpostss:blogpostss})
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

        //INDEX - show all campgrounds
app.get("/search", (req, res)=>{
    var noMatch = null;
    console.log(req.query)
    if(req.query.title) {
        const regex = new RegExp(escapeRegex(req.query.title), 'gi');
        // Get all campgrounds from DB
        const searchquery = blogpost.find({body: regex}, function(err, blogpostsQ){
           if(err){
               console.log(err);
           } else {
              if(blogpostsQ.length < 1) {
                  noMatch = "No posts match that query, please try again.";
              }
              res.render("search",{blogpostsQ:blogpostsQ, noMatch: noMatch});
              console.log(blogpostsQ)
           }
        });
    } else {
        // Get all campgrounds from DB
        blogpost.find({}, function(err, blogpostsQ){
           if(err){
               console.log(err);
           } else {
              res.render("search",{blogpostsQ:blogpostsQ, noMatch: noMatch});
           }
        });
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
