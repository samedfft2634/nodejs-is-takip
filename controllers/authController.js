"use strict";
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const hataYakala = (err) => {
	let errors = { email: "", password: "" };
	if (err.code === 11000) {
		errors.email = "Bu mail adresi veritabaninda bulunuyor!";
		return errors;
	}
	if (err.message.includes("User validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
		return errors;
	}

	if (err.message === "Email Error") {
		errors.email = "Emaill adress is wrong!";
	} else if (err.message === "Password Error") {
		errors.password = "Password adress is wrong!";
	}
	// console.log(err.message, err.code);
};

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

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
			res.cookie("jwt", token, { httpOnly: true, maxAge });
			// console.log(email, password);
			res.status(201).json(user);
		} catch (error) {
			// res.status(400).send("Hata olustu! Kullanıcı oluşmadı." + error);
			const errors = hataYakala(error);
			res.status(400).json({ errors });
		}
	},

	postLogIn: async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await User.login(email, password);
			const token = createToken(user._id);
			res.cookie("jwt", token, { httpOnly: true, maxAge });
			res.status(200).json({ user: user._id });
		} catch (error) {
			const errors = hataYakala(error);
			res.status(400).json({ errors });
		}
	},

	getLogout:async(req,res)=>{
		res.cookie('jwt','çıkış yapıldı',{maxAge:1})
		res.redirect('/')
	}
};
