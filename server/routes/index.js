const Router = require('express')
const router = new Router()
const studentRouter = require('./studentRouter')
const courseRouter = require('./courseRouter')
const facultyRouter = require('./facultyRouter')
const groupRouter = require('./groupRouter')
const academicPerformanceRouter = require('./academicPerformanceRouter')


router.use('/student', studentRouter)
router.use('/course', courseRouter)
router.use('/faculty', facultyRouter)
router.use('/group', groupRouter)
router.use('/academicPerformance', academicPerformanceRouter)


module.exports = router
