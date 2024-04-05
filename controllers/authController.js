"use strict";
const { User } = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

const encryptPassword = async(password)=>{
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt)
	return password
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
		if(email && password){
			const user = await User.findOne({email})
			if(user && user.password ){
				req.session.id = user.id;
				req.session.password = user.password
				res.send("Logged In")
				console.log("Logged in Successfully!")
			} else{
				res.status = 401;
				throw new Error("Login parameters are not true.");
			}
		} else {
			res.status = 401;
			throw new Error("Email and password are required.");
		}
		res.send("Kullanıcı girişi başarılı!");
	},
};
