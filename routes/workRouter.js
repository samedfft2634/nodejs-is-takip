"use strict";
/* ___________________ workRouter __________________ */

const router = require("express").Router();
const workController = require("../controllers/workController");
const {authToken} = require("../middlewares/authMiddleware");

router.get("/work-add",authToken, workController.work_add_get);

module.exports = router;
