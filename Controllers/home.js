const blogpost = require('../models/blogpost.js')
module.exports = async (req, res) => {
    const blogposts = await blogpost.find({}, function (err, data) {if(err){console.log(err)}})
    res.render('index', {
        blogposts: blogposts
    })
}