const express = require("express");
const router = express.Router();
const { ValidationError } = require("../../utils/error-app");
const IdeaService = require("../../services/commons/service.idea");
const ideaService = new IdeaService();


//find all 
router.get("/", async (req,res,next) => {
    try {
        const ideas = await ideaService.find()
        return res.json(ideas)
    } catch (error) {
        next(error)
    }
})


//create 
router.post("/", async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;