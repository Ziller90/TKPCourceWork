const bcrypt = require('bcrypt')
const ApiError = require ('../error/ApiError')
const jwt = require('jsonwebtoken')
const {Student} = require('../models/student_model')
const {DataTypes} = require("sequelize");

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class StudentController {
    async registration(req, res, next) {
        const {username, surname, gender, birthdate, email, password, fundingType, studyForm, educationLevel, courseNumber,
            facultyName, academicPerformanceId, groupNumber} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest(('Некорректный email или паролЬ')))
        }

        const candidate = await Student.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(('Пользователь с таким email уже существует!')))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const student = await Student.create({username, surname, gender, birthdate, email, password: hashPassword, fundingType, studyForm, educationLevel, courseNumber,
            facultyName, academicPerformanceId, groupNumber})
        const token = generateJwt(student.id, student.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const student = await Student.findOne({where: {email}})
        if (!student) {
            return next(ApiError.internal('ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН!'))
        }
        let comparePassword = bcrypt.compareSync(password, student.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль!'))
        }
        const token = generateJwt(student.id, student.email)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.students.id, req.students.email)
        return res.json({token})
    }

    async getAll(req, res) {
        const student = await Student.findAll()
        return res.json(student)
    }

    async getOne(req, res) {
        const{email} = req.params
        const student = await Student.findOne({where: {email}})
        return res.json(student)
    }


    async updateOne(req, res, next) {
        const { email } = req.params;
        const {newGender, newBirthdate, newGroupNumber, newCourseNumber, newFundingType, newFacultyName, newStudyForm, newEducationLevel} = req.body

        if (req.user.email !== email) {
            return res.status(403).json({ message: 'Нет прав для изменения данных этого пользователя' });
        }
        
        const student = await Student.findOne({where: {email}})
        if (!student) {
            return next(ApiError.badRequest(('Пользователя не существует!')))
        }
        student.gender = newGender
        student.birthdate = newBirthdate
        student.groupNumber = newGroupNumber
        student.courseNumber = newCourseNumber
        student.fundingType = newFundingType
        student.facultyName = newFacultyName
        student.studyForm = newStudyForm
        student.educationLevel = newEducationLevel
        await student.save();
        return res.json({ message: 'Данные успешно обновлены!' })
    }

}

module.exports = new StudentController()