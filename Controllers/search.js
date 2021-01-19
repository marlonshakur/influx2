const blogpost = require('../models/blogpost.js')
module.exports = (req, res) => {
    var noMatch = null;
    if (req.query.title) {
        const regex = new RegExp(escapeRegex(req.query.title), 'gi');
        // Get all campgrounds from DB
        const searchquery = blogpost.find({
            body: regex
        }, function (err, blogpostsQ) {
            if (err) {
                console.log(err);
            } else {
                if (blogpostsQ.length < 1) {
                    noMatch = "No posts match that query, please try again.";
                }
                res.render("search", {
                    blogpostsQ: blogpostsQ,
                    noMatch: noMatch
                });
                
            }
        });
    } else {
        // Get all campgrounds from DB
        blogpost.find({}, function (err, blogpostsQ) {
            if (err) {
                console.log(err);
            } else {
                res.render("search", {
                    blogpostsQ: blogpostsQ,
                    noMatch: noMatch
                });
            }
        });
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};