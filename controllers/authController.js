"use strict";
const { User } = require("../models/user");
const jwt = require('jsonwebtoken')

const hataYakala = (err)=>{

	let errors = {email:"",password:""}
	if(err.code === 11000){
		errors.email = "Bu mail adresi veritabaninda bulunuyor!";
		return errors;
	}
	if(err.message.includes('user validation failed')){
		Object.values(err.errors).forEach(({properties})=>{
			errors[properties.path]=properties.message;
		})
		return errors;
	}
 console.log(err.message,err.code)       
}

const maxAge=3*24*60*60*1000

const createToken=(id)=>{
	return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:maxAge})
}

module.exports = {
	getSignUp: (req, res) => {
		res.render("signup");
	},

	getLogIn: (req, res) => {
		res.render("login");
	},

	signup_post: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.create({ email, password });
			const token = createToken(user._id);
			res.cookie('jwt',token,{httpOnly:true,maxAge})
			console.log(email, password);
			res.status(201).send({ user });
		} catch (error) {
			// res.status(400).send("Hata olustu! Kullanıcı oluşmadı." + error);
			const errors = hataYakala(error)
            res.status(400).send({
                message: errors
            })
		}
	},

	postLogIn: async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);
		res.send("Kullanıcı girişi başarılı!");
	},
};
