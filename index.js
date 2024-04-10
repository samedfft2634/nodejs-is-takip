"use strict";
/* ====================================================== */
/*              IS TAKIP UYGULAMASI EXPRESSJS             */
/* ====================================================== */
const express = require("express");
const { mongoose } = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
	require("cookie-session")({
		secret: process.env.SECRET_KEY,
		maxAge: 1_000 * 60 * 60 * 24 * 3,
	})
);
const { authToken,controlUser } = require("./middlewares/authMiddleware");

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

app.get("*", controlUser);
app.get("/", authToken, (req, res) => res.render("home"));

/* =================================================== */
// Routes
app.use(require("./routes/authRouter"));
app.use(require('./routes/workRouter'))

// require('./sync')();