const express = require("express");
const { ValidationError } = require("../../utils/error-app");
const router = express.Router();
const SubmissionService = require("../../services/commons/service.submission");
const submissionService = new SubmissionService();

//Find all
router.get("/", async(req, res, next) => {
    try {
        const submissions = await submissionService.find();
        return res.json(submissions);
    } catch (err) {
        next(err);
    }
});

//Create Role
router.post("/", async(req, res, next) => {
    try {
        const { name, desc } = req.body;

        if (!name) throw new ValidationError("Missing Text");

        const createdSubmission = await submissionService.create(req.body);

        return res.json(createdSubmission);
    } catch (err) {
        next(err);
    }
});

//Fine One
router.get("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const foundSubmission = await submissionService.findOne(id);

        return res.json(foundSubmission);
    } catch (err) {
        next(err);
    }
});

//Update
router.patch("/:id", async(req, res, next) => {
    try {
        const { name, desc } = req.body;
        const { id } = req.params;

        if (!name) throw new ValidationError("Missing Text");

        const updatedSubmission = await submissionService.update(id, req.body);

        return res.json(updatedSubmission);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const deletedSubmission = await submissionService.delete(id);
        return res.json(deletedSubmission);
    } catch (err) {
        next(err);
    }
});

module.exports = router;