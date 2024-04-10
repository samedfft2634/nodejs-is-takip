"use strict";
/* ________________ Work Controller ________________ */
const Work = require('../models/work')

module.exports.work_add_get = (req,res) => {
	res.render("work-add");
};

module.exports.work_add_post = async(req,res)=>{
	const {title,description,startDate,endDate} = req.body

	try {	
		console.log(res.locals)
		const newWork = await Work.create({
			title,
			description,
			startDate:new Date(startDate),
			endDate:new Date(endDate),
			userId:res.locals.user._id
		})
		
        const work = await newWork.save();
        console.log("Work created successfully:", work);
        res.status(201).json({ work });
	} catch (error) {
		console.error("Error creating work:", error);
        res.status(400).json({ error: "Bad request" })
    
	}
}

module.exports.works_get = async(req,res)=>{
	const works = Work.find({'userId':res.locals.user._id}).then((result)=>{
		res.render('works',{works:result})
	})
}

