const ApiError = require ('../error/ApiError')
const {Group, Faculty} = require("../models/student_model");
class GroupController {
    async create(req, res) {
        const {number, tutorName, studentsNumber, courseNumber, facultyName} = req.body
        const candidate = await Group.findOne({where: {number}})
        if (candidate) {
            return res.json(candidate);
        }
        const group = await Group.create({number, tutorName, studentsNumber, courseNumber, facultyName})
        return res.json(group)
    }
    async getAll(req, res) {
        const allGroups = await Group.findAll()
        return res.json(allGroups)
    }
}
module.exports = new GroupController()