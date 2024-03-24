"use strict";
const { User } = require("../models/user");

const hataYakala = (err)=>{
 console.log(err.message,err.code)       
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
			console.log(email, password);
			res.status(201).send({ user });
		} catch (error) {
			// res.status(400).send("Hata olustu! Kullanıcı oluşmadı." + error);
            res.status(400).send({
                message: hataYakala(error)
            })
		}
	},

	postLogIn: async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);
		res.send("Kullanıcı girişi başarılı!");
	},
};
