const path = require('path')
const blogpost = require('../models/blogpost.js')

module.exports= (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img', image.name), async () => {
                    await blogpost.create({...req.body,image: '/img/' + image.name}, (err, data) => {
                        if (err) {
                            console.log(err)
                        } 
                    })
                    res.redirect('/')
                }

            )}