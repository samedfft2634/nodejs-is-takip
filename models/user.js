'use strict'
const mongoose = require("mongoose");
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,`Mail adresini girilmek zorundadir!\n`],
        unique:true,
        lowercase:true,
        validate:[isEmail,`Lütfen geeçerli bir email adresi giriniz!\n`]
    },
    password:{
        type:String,
        required:[true,`Parola girilmek zorundadır!\n`],
        minlength:[6,`Parola en az 6 karakter uzunluğunda olmak zorundadir!\n`]
        
    },
},{
    collection:"users",
    timestamps:true
})



module.exports={
    mongoose,
    User: mongoose.model('User',userSchema)
}