const Router = require('express')
const router = new Router()
const academicPerformanceController = require('../controllers/academicPerformanceController')

/**
 * @swagger
 * /api/academicPerformance:
 *   post:
 *     summary: Создает новую запись об академической успеваемости
 *     tags: [AcademicPerformance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classesNumber
 *               - averageMark
 *             properties:
 *               classesNumber:
 *                 type: integer
 *                 description: Количество классов, посещаемых студентом
 *               averageMark:
 *                 type: number
 *                 format: float
 *                 description: Средний балл студента
 *     responses:
 *       200:
 *         description: Новая запись об успеваемости успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Уникальный идентификатор записи об успеваемости
 *                 classesNumber:
 *                   type: integer
 *                   description: Количество классов, посещаемых студентом
 *                 averageMark:
 *                   type: number
 *                   format: float
 *                   description: Средний балл студента
 *       400:
 *         description: Неверный запрос, недостаточно данных или данные некорректны
 */
router.post('/', academicPerformanceController.create)

/**
 * @swagger
 * /api/academicPerformance:
 *   get:
 *     summary: Получает список всех записей академической успеваемости
 *     tags: [AcademicPerformance]
 *     responses:
 *       200:
 *         description: Список всех записей академической успеваемости
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор записи об успеваемости
 *                   classesNumber:
 *                     type: integer
 *                     description: Количество классов, посещаемых студентом
 *                   averageMark:
 *                     type: number
 *                     format: float
 *                     description: Средний балл студента
 *       500:
 *         description: Ошибка сервера
 */
router.get('/', academicPerformanceController.getAll)

module.exports = router