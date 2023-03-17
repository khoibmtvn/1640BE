const express = require("express");
const { ValidationError } = require("../../utils/error-app");
const router = express.Router();
const RoleService = require("../../services/commons/service.role");
const roleService = new RoleService();


//Find all
router.get("/",  async(req, res, next) => {
    try {
        const roles = await roleService.find();
        return res.json(roles);
    } catch (err) {
        next(err);
    }
});

//Create Role
router.post("/", async(req, res, next) => {
    try {
        const { name, desc } = req.body;

        if (!name) throw new ValidationError("Missing Text");

        const createdRole = await roleService.create(req.body);

        return res.json(createdRole);
    } catch (err) {
        next(err);
    }
});

//Fine One
router.get("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const foundRole = await roleService.findOne(id);

        return res.json(foundRole);
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

        const updatedRole = await roleService.update(id, req.body);

        return res.json(updatedRole);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const deletedRole = await roleService.delete(id);
        return res.json(deletedRole);
    } catch (err) {
        next(err);
    }
});

module.exports = router;