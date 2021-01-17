const mongoose = require('mongoose')
const schema = mongoose.Schema;
const blogpostschema = new schema({
title: String,
body: String
});

const blogpost = mongoose.model('blogpost',blogpostschema);
module.exports = blogpost