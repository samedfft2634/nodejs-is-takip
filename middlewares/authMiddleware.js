'use strict'
/* ________________ Auth Middleware ________________ */
const jwtoken = require('jsonwebtoken')

module.exports = {
    authToken : (req,res,next)=>{
        // console.log(req.cookies)
        const token = req.cookies.jwt
        if(token){
            jwtoken.verify(token,process.env.SECRET_KEY,(err,result)=>{
                if(err){
                    // console.log(err.message)
                    res.redirect('/login')
                }else{
                    // console.log(result)
                    next()
                }
            })
        } else {
            res.redirect('/login')
        }
    },
}


