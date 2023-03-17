const express = require("express");
const router = express.Router();
const CategoryService = require("../../services/commons/service.category");
const { ValidationError } = require("../../utils/error-app");
const categoryService = new CategoryService();
const {verifyToken, isAdmin } = require ("../../middlewares/auth");

//find All
router.get("/",  verifyToken, isAdmin, async(req, res, next) => {
    try {
        const categorys = await categoryService.find();
        return res.json(categorys);
    } catch (error) {
        next(error);
    }
});

//Create
router.post("/",  verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { name, desc } = req.body

        if (!name) throw new ValidationError("Missing Text");

        const createdCategory = await categoryService.create(req.body);
        return res.json(createdCategory);
    } catch (error) {
        next(error);
    }
});


//Find One
router.get("/:id",  verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params;

        const foundCategory = await categoryService.findOne(id);

        return res.json(foundCategory);
    } catch (err) {
        next(err);
    }
})


//Update
router.patch("/:id", verifyToken, isAdmin,  async(req, res, next) => {
    try {
        const { name, desc } = req.body;
        const { id } = req.params;

        if (!name) throw new ValidationError("Missing Text");

        const updatedCategory = await categoryService.update(id, req.body);

        return res.json(updatedCategory);
    } catch (err) {
        next(err);
    }
});

//Delete
router.delete("/:id", verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoryService.delete(id);
        return res.json(deletedCategory);
    } catch (err) {
        next(err);
    }
});

try {
    const existingName = await Category.findOne({name})
    if(existingName)
    return  res.status(400).render()
} catch (error) {
    console.log(error)
    res.status(500).json({success:false , message:'Error'}) 
}
try {
    const newcategory = new Category({
        name , 
        description
    })
    await newcategory.save()
    res.redirect('/admin/router.admin.category')
} catch (error) {
    console.log(error)
    res.status(500).json({success:false , message:'Error'}) 
};
module.exports = router;