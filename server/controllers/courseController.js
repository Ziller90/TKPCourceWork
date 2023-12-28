const ApiError = require ('../error/ApiError')
const {Course, Student} = require("../models/student_model");
class CourseController {
    async create(req, res) {
        const {number} = req.body
        const candidate = await Course.findOne({where: {number}})
        if (candidate) {
            return res.json(candidate);
        }

        const course = await Course.create({number})
        return res.json(course)
    }
    async getAll(req, res) {
        const allCourses = await Course.findAll()
        return res.json(allCourses)
    }
}
module.exports= new CourseController()