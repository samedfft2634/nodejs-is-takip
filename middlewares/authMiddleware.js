'use strict'
/* ________________ Auth Middleware ________________ */
const jwtoken = require('jsonwebtoken')
const { User } = require('../models/user')

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
     controlUser : (req, res, next) => {
		const token = req.cookies.jwt;
		if (token) {
			jwtoken.verify(token, process.env.SECRET_KEY, async (err, result) => {
				if (err) {
					res.locals.user = null;
					next();
				} else {
					// console.log(result.id);
					let user = await User.findById(result.id);
					res.locals.user = user;
					next();
				}
			});
		} else {
			res.locals.user = null;
			next();
		}
	}
}


