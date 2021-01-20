const user = require('../models/user')
module.exports=(req,res)=>{user.create(req.body,(err,data)=>{
        if(err){
            console.log(err,data)
            return res.redirect('/auth/register')

        }
        res.redirect('/')})   
    }
