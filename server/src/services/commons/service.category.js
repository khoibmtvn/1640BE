const Category = require("../../models/category");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");


class CategoryService {
    //find all
    async find() {
            const categories = await Category.find()
            return categories
        }
        //create
    async create(category) {
            const { name, desc } = category

            if (await Category.findOne({ name })) throw new BadRequestError("Category existed");

            const newCategory = new Category({
                name,
                desc,
            });

            const createdCategory = await newCategory.save()
            return createdCategory
        }
        //findOne
    async findOne(id) {
            const foundCategory = await Category.findById(id)
            if (!foundCategory) throw new NotFoundError("Not found category")
            return foundCategory

        }
        //update
    async update(id, category) {
        if (!(await Category.findById(id)))
            throw new BadRequestError("Category not existed");

        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true });
        return updatedCategory;
    }

    //delete
    async delete(id) {
        if (!(await Category.findById(id)))
            throw new BadRequestError("Category not existed");

        const deletedCategory = await Category.findByIdAndRemove(id);
        return deletedCategory;
    }

}

module.exports = CategoryService