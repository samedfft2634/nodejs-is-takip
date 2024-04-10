"use strict"
module.exports = async function() {

    return null;

    /* REMOVE DATABASE */
    const mongoose = require('mongoose')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
}