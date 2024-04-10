"use strict";
/* ________________ Work Controller ________________ */
const Work = require('../models/work')

module.exports.work_add_get = (req,res) => {
	res.render("work-add");
};

module.exports.work_add_post = async(req,res)=>{
	const {title,description,startDate,endDate} = req.body
	try {
		const work = await Work.create({
			title,
			description,
			startDate:new Date(startDate),
			endDate:new Date(endDate),
			userId:res.locals.user._id,	
		})
		res.status(201).json({work:work._id})
	} catch (error) {
		res.status(400).json({error})
	}
}

