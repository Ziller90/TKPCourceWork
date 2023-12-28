const ApiError = require ('../error/ApiError')
const {AcademicPerformance} = require("../models/student_model");
class AcademicPerformanceController {

    
    async create(req, res) {
        const {classesNumber, averageMark} = req.body
        const academicPerformance = await AcademicPerformance.create({classesNumber, averageMark})
        return res.json(academicPerformance)
    }
    async getAll(req, res) {
        const allAcademicPerformances = await AcademicPerformance.findAll()
        return res.json(allAcademicPerformances)
    }
}
module.exports= new AcademicPerformanceController()