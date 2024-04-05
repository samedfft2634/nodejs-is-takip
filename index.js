"use strict";
/* ====================================================== */
/*              IS TAKIP UYGULAMASI EXPRESSJS             */
/* ====================================================== */
const express = require("express");
const { mongoose } = require("./models/user");
const app = express();

require("dotenv").config();

const cookieParser = require('cookie-parser')

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser)

app.set("view engine", "ejs");

const DB_URI = process.env.DB_URI;

mongoose
	.connect(DB_URI)
	.then((result) =>
		app.listen(3000, () => {
			console.log(
				"*DB bağlantısı başarılı, server dinleniyor. http://localhost:3000 *"
			);
		})
	)
	.catch((err) => console.log(err));

app.get("/", (req, res) => res.render("home"));
app.get("/works", (req, res) => res.render("works"));

/* =================================================== */
// Routes
app.use(require("./routes/authRouter"));

app.get('/set-cookies',(req,res)=>{
	res.cookie('yeni','false')
	res.cookie('parola','12345',{maxAge:1000*60*60*24,httpOnly:true})
	res.status(200).send('Cookie olustu.')
})
app.get('/get-cookies',(req,res)=>{
const cookies = req.cookies;
console.log(cookies)
res.send(cookies)
})
