const Submission = require("../../models/submission");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");


class submissionService {
    //find all
    async find() {
            const submissions = await Submission.find()
            return submissions
        }
        //create
    async create(submission) {
            const { name, desc } = submission

            if (await Submission.findOne({ name })) throw new BadRequestError("Submission existed");

            const newSubmission = new Submission({
                name,
                desc,
            });

            const createdSubmission = await newSubmission.save()
            return createdSubmission
        }
        //findOne
    async findOne(id) {
            const foundSubmission = await Submission.findById(id)
            if (!foundSubmission) throw new NotFoundError("Not found submision")
            return foundSubmission

        }
        //update
    async update(id, submision) {
        if (!(await Submission.findById(id)))
            throw new BadRequestError("Submision not existed");

        const updatedSubmission = await Submission.findByIdAndUpdate(id, submision, { new: true });
        return updatedSubmission;
    }

    //delete
    async delete(id) {
        if (!(await Submission.findById(id)))
            throw new BadRequestError("Submision not existed");

        const deletedSubmission = await Submission.findByIdAndRemove(id);
        return deletedSubmission;
    }

}

module.exports = submissionService