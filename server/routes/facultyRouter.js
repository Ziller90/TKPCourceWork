const Router = require('express')
const router = new Router()
const facultyController = require('../controllers/facultyController')

/**
 * @swagger
 * /api/faculty:
 *   post:
 *     summary: Создает новый факультет
 *     tags: [Faculty]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - studentsNumber
 *               - dean
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название факультета
 *               studentsNumber:
 *                 type: integer
 *                 description: Количество студентов на факультете
 *               dean:
 *                 type: string
 *                 description: Декан факультета
 *     responses:
 *       200:
 *         description: Факультет успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Уникальный идентификатор факультета
 *                 name:
 *                   type: string
 *                 studentsNumber:
 *                   type: integer
 *                 dean:
 *                   type: string
 *       409:
 *         description: Факультет с таким названием уже существует
 */
router.post('/', facultyController.create)

/**
 * @swagger
 * /api/faculty:
 *   get:
 *     summary: Получает список всех факультетов
 *     tags: [Faculty]
 *     responses:
 *       200:
 *         description: Список всех факультетов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор факультета
 *                   name:
 *                     type: string
 *                     description: Название факультета
 *                   studentsNumber:
 *                     type: integer
 *                     description: Количество студентов на факультете
 *                   dean:
 *                     type: string
 *                     description: Декан факультета
 */
router.get('/', facultyController.getAll)

module.exports = router