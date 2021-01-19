const blogpost = require('../models/blogpost.js')
module.exports = async (req, res) => {
    const blogpostss = await blogpost.findById((req.params.id), (err, x) => {
       if (err){console.log(err)}})
    res.render('post', {
        blogpostss: blogpostss
    })
}