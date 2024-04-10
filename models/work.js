'use strict'
/* __________________ Work Schema __________________ */
const {mongoose} = require('../models/user')

const WorkSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        index:true,
        unique:true, 
    },

    title:{
        type:String,
        trim:true,
        required:true,
    },

    description:String,

    startDate:Date,

    endDate:Date,

},{
    collection:"works",
    timestamps:true,
})
module.exports = mongoose.model("Work",WorkSchema)