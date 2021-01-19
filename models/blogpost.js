const mongoose = require('mongoose')
const schema = mongoose.Schema;
//------------------------------------------------
const blogpostschema = new schema({
title: String,
body: String,
name: String,
datePosted:{
type: Date,
default: new Date()
},
image: String
});
//------------------------------------------------
const blogpost = mongoose.model('blogpost',blogpostschema);
module.exports = blogpost

