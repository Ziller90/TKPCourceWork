const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')

 /**
     * @swagger
     * /api/course:
     *   post:
     *     summary: Создает новый курс
     *     tags: [Course]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - number
     *             properties:
     *               number:
     *                 type: integer
     *                 description: Номер курса
     *     responses:
     *       200:
     *         description: Новый курс успешно создан
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 number:
     *                   type: integer
     *       409:
     *         description: Курс с таким номером уже существует
     */
router.post('/', courseController.create)

 /**
     * @swagger
     * /api/course:
     *   get:
     *     summary: Получает список всех курсов
     *     tags: [Course]
     *     responses:
     *       200:
     *         description: Список всех курсов
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   number:
     *                     type: integer
     */
router.get('/', courseController.getAll)

module.exports = router