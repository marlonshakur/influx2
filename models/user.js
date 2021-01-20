const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const schema = mongoose.Schema;
//------------------------------------------------
const userschema = new schema({
username: {type:String,required:true,unique:true},
password: {type:String,required:true},
name: String})
//------------------------------------------------
userschema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        console.log(hash)
        next()
})})
const user = mongoose.model('user',userschema);
module.exports = user

