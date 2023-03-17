const Role = require("../../models/role");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");

class RoleService {
  async find() {
    const roles = await Role.find();
    return roles;
  }

  async findOne(id) {
    const foundRole = await Role.findById(id);
    if (!foundRole) throw new NotFoundError("Not found role");
    return foundRole;
  }

  async create(role) {
    const { name, desc } = role;
    //kiem tra neu khong ton tai, thi moi cho tao role
    if (await Role.findOne({ name })) throw new BadRequestError("Role existed");

    const newRole = new Role({
      name,
      desc,
    });

    const createdRole = await newRole.save();
    return createdRole;
  }

  async update(id, role) {
    //kiem tra role neu khong ton tai thi ra loi
    if (!(await Role.findById(id)))
      throw new BadRequestError("Role not existed");

    const updatedRole = await Role.findByIdAndUpdate(id, role, { new: true });
    return updatedRole;
  }

  async delete(id) {
    if (!(await Role.findById(id)))
      throw new BadRequestError("Role not existed");
    const deletedRole = await Role.findByIdAndRemove(id);

    return deletedRole;
  }
}

module.exports = RoleService;
