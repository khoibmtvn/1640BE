const Department = require("../../models/department");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");


class departmentService {
    //find all
    async find() {
            const departments = await Department.find()
            return departments
        }
        //create
    async create(department) {
            const { name, desc } = department

            if (await Department.findOne({ name })) throw new BadRequestError("Category existed");

            const newDepartment = new Department({
                name,
                desc,
            });

            const createdDepartment = await newDepartment.save()
            return createdDepartment
        }
        //findOne
    async findOne(id) {
            const foundDepartment = await Department.findById(id)
            if (!foundDepartment) throw new NotFoundError("Not found department")
            return foundDepartment

        }
        //update
    async update(id, department) {
        if (!(await Department.findById(id)))
            throw new BadRequestError("Department not existed");

        const updatedDepartment = await Department.findByIdAndUpdate(id, department, { new: true });
        return updatedDepartment;
    }

    //delete
    async delete(id) {
        if (!(await Department.findById(id)))
            throw new BadRequestError("Department not existed");

        const deletedDepartment = await Department.findByIdAndRemove(id);
        return deletedDepartment;
    }

}

module.exports = departmentService