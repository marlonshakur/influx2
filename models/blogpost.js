const mongoose = require('mongoose')
const schema = mongoose.Schema;
const blogpostschema = new schema({
title: String,
body: String,
name: String,
datePosted:{ /* can declare property type with an object like this because we need 'default' */
type: Date,
default: new Date()
}
});

const blogpost = mongoose.model('blogpost',blogpostschema);
module.exports = blogpost

