const { static } = require('express')
const express = require('express')
const path = require('path')
const app = express()
app.use(static('./public'))
app.listen(4000)
const homepage = path.resolve(__dirname,'./views/index.html')
const about = path.resolve(__dirname,'./views/about.html')
const post = path.resolve(__dirname,'./views/post.html')
const contact = path.resolve(__dirname,'./views/contact.html')

app.get('/',(req,res)=>{
console.log('the user requested : '+req.url)
res.sendFile(homepage)
    })
app.get('/about',(req,res)=>{
    console.log('the user requested : '+req.url)
    res.sendFile(about)
    })
app.get('/post',(req,res)=>{
    console.log('the user requested : '+req.url)
    res.sendFile(post)
    })
app.get('/contact',(req,res)=>{
    console.log('the user requested : '+req.url)
    res.sendFile(contact)
    })
        