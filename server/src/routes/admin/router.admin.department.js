const express = require("express");
const { ValidationError } = require("../../utils/error-app");
const router = express.Router();
const DepartmentService = require("../../services/commons/service.department");
const departmentService = new DepartmentService();

//Find all
router.get("/", async(req, res, next) => {
    try {
        const departments = await departmentService.find();
        return res.json(departments);
    } catch (err) {
        next(err);
    }
});

//Create Role
router.post("/", async(req, res, next) => {
    try {
        const { name, desc } = req.body;

        if (!name) throw new ValidationError("Missing Text");

        const createdDepartment = await departmentService.create(req.body);

        return res.json(createdDepartment);
    } catch (err) {
        next(err);
    }
});

//Fine One
router.get("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const foundDepartment = await departmentService.findOne(id);

        return res.json(foundDepartment);
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

        const updatedDepartment = await departmentService.update(id, req.body);

        return res.json(updatedDepartment);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await departmentService.delete(id);
        return res.json(deletedDepartment);
    } catch (err) {
        next(err);
    }
});

module.exports = router;