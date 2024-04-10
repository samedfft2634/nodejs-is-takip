"use strict";
/* ___________________ workRouter __________________ */

const router = require("express").Router();
const workController = require("../controllers/workController");
const {authToken,controlUser} = require("../middlewares/authMiddleware");

router.get("/work-add",authToken, workController.work_add_get);
router.post('/work-add',controlUser, workController.work_add_post)
router.get('/works',authToken, workController.works_get)

module.exports = router;
