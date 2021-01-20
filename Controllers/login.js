const bcrypt = require('bcrypt')
const user = require('../models/user')
module.exports = (req, res) =>{
const { username, password } = req.body;
user.findOne({username:username}, (error,user) => {
if (user){
bcrypt.compare(password, user.password, (error, same) =>{
if(same){ // if passwords match
// store user session, will talk about it later
req.session.userId = user._id
console.log(user.username+' you have successfully logged in ')
res.redirect('/')
}
else{
res.redirect('/auth/login')
}})
}
else{
res.redirect('/auth/login')
}
})
}