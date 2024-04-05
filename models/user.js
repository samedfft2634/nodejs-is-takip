"use strict";
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, `Mail adresini girilmek zorundadir!\n`],
			unique: true,
			lowercase: true,
			validate: [isEmail, `Lütfen geeçerli bir email adresi giriniz!\n`],
		},
		password: {
			type: String,
			required: [true, `Parola girilmek zorundadır!\n`],
			minlength: [
				6,
				`Parola en az 6 karakter uzunluğunda olmak zorundadir!\n`,
			],
		},
	},
	{
		collection: "users",
		timestamps: true,
	}
);

userSchema.post("save", function (doc, next) {
	console.log("kaydediltikten sonra calisacak", doc);
	next();
});

userSchema.pre("save", async function (next) {
	// console.log("kaydedilmeden once calisacak!!!",this)
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

module.exports = {
	mongoose,
	User: mongoose.model("User", userSchema),
};
