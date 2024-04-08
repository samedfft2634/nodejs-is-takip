"use strict";
/* ====================================================== */
/*              IS TAKIP UYGULAMASI EXPRESSJS             */
/* ====================================================== */
const express = require("express");
const { mongoose } = require("./models/user");
const app = express();
const {User} = require('./models/user')
const cookieParser = require('cookie-parser');
const jwtoken = require('jsonwebtoken')


require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY,maxAge: 1_000 * 60 * 60 * 24 * 3 }));
const {authToken} = require('./middlewares/authMiddleware')

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

app.get('*',(req,res,next)=>{
	const token = req.cookies.jwt
	if(token){
		jwtoken.verify(token,process.env.SECRET_KEY,async(err,result)=>{
			if(err){
				res.locals.user = null;
				next();
			} else{
			  console.log(result.id)
			  let user = await User.findById(result.id)
			  res.locals.user = user
			  next()
			}
		})
		
	} else {
		res.locals.user = null;
		next();
	}},
)
app.get("/",authToken, (req, res) => res.render("home"));
app.get("/works",authToken, (req, res) => res.render("works"));

/* =================================================== */
// Routes
app.use(require("./routes/authRouter"));

