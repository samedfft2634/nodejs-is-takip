"use strict";
const User = require("../models/user");

module.exports = {
	getSignUp: (req, res) => {
		res.render("signup");
	},

	getLogIn: (req, res) => {
		res.render("login");
	},

	postSignUp: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.create({ email, password });
			console.log(email, password);
			res.status(201).send({ user });
		} catch (error) {
			res.status(400).send("Hata olustu! Kullanıcı oluşmadı.");
		}
	},
	postLogIn: async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);
		res.send("Kullanıcı girişi başarılı!");
	},
};
