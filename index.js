"use strict";
/* ====================================================== */
/*              IS TAKIP UYGULAMASI EXPRESSJS             */
/* ====================================================== */
const express = require("express");
const {mongoose} = require("./models/user");
const app = express();

require('dotenv').config();

app.use(express.static("public"));
app.use(express.json())

app.set("view engine", "ejs");

const DB_URI = process.env.DB_URI;

mongoose
	.connect(DB_URI)
	.then((result) =>
		app.listen(3000, () => {
			console.log("*DB bağlantısı başarılı, server dinleniyor. http://localhost:3000 *");
		})
	)
	.catch((err) => console.log(err));

app.get("/", (req, res) => res.render("home"));
app.get("/works", (req, res) => res.render("works"));

/* =================================================== */
// Routes
app.use(require('./routes/authRouter'))
