'use strict'
/* __________________ Work Schema __________________ */
const {mongoose} = require('../models/user')

const WorkSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },

    description:String,

    startDate:Date,

    endDate:Date,

    userId:String,

},{
    collection:"works",
    timestamps:true,
})
module.exports = mongoose.model("Work",WorkSchema)