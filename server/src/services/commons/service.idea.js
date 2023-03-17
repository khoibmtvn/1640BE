const Idea = require("../../models/idea");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");

const CategoryService = require("../../services/admin/service.admin.role");
const categoryService = new CategoryService();

const DepartmentService = require("../../services/admin/service.admin.user")
const departmentService = new DepartmentService()

const SubmissionService = require("../../services/admin/service.admin.submission");
const submissionService = new SubmissionService();

class IdeaService {

    // find all
async find(){
    const ideas = await Idea.find()
    return ideas
}

//create
async create(idea) {
    const {title,desc,content,category_id,submission_id} = idea

    if(await Idea.findOne({title})) throw new BadRequestError ("Title existed")

    const foundCategory = await categoryService.findOne(category_id)

    const foundDepartment = await departmentService.findOne(department_id)

    const foundSubmission = await submissionService.findOne(submission_id)
}

}

module.exports = IdeaService;