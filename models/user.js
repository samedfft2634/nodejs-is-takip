'use strict'
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
},{
    collection:"users",
    timestamps:true
})



module.exports={
    mongoose,
    User: mongoose.model('User',userSchema)
}