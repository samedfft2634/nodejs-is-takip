"use strict";
const express = require("express");
const mongoose = require("mongoose");

const app = express();
require('dotenv').config();

app.use(express.static("public"));

app.set("view engine", "ejs");

const DB_URI = process.env.DB_URI;

mongoose
	.connect(DB_URI)
	.then((result) =>
		app.listen(3000, () => {
			console.log("*DB bağlantısı başarılı, server dinleniyor.*");
		})
	)
	.catch((err) => console.log(err));

app.get("/", (req, res) => res.render("home"));
app.get("/works", (req, res) => res.render("works"));
