"use strict";
/* ________________ Work Controller ________________ */
const Work = require('../models/work')

module.exports.work_add_get = (req,res) => {
	res.render("work-add");
};

module.exports.work_add_post = async(req,res)=>{
	const {title,description,startDate,endDate} = req.body

	try {	
		const newWork = await Work.create({
			title,
			description,
			startDate:new Date(startDate),
			endDate:new Date(endDate)
		})
		
        const work = await newWork.save();
        console.log("Work created successfully:", work);
        res.status(201).json({ work });
	} catch (error) {
		console.error("Error creating work:", error);
        res.status(400).json({ error: "Bad request" })
    
	}
}

