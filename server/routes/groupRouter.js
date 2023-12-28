const Router = require('express')
const router = new Router()
const groupController = require('../controllers/groupController')

/**
 * @swagger
 * /api/group:
 *   post:
 *     summary: Создает новую группу
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - tutorName
 *               - studentsNumber
 *               - courseNumber
 *               - facultyName
 *             properties:
 *               number:
 *                 type: string
 *                 description: Номер группы
 *               tutorName:
 *                 type: string
 *                 description: Имя куратора группы
 *               studentsNumber:
 *                 type: integer
 *                 description: Количество студентов в группе
 *               courseNumber:
 *                 type: integer
 *                 description: Номер курса
 *               facultyName:
 *                 type: string
 *                 description: Название факультета
 *     responses:
 *       200:
 *         description: Новая группа успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: string
 *                 tutorName:
 *                   type: string
 *                 studentsNumber:
 *                   type: integer
 *                 courseNumber:
 *                   type: integer
 *                 facultyName:
 *                   type: string
 *       409:
 *         description: Группа с таким номером уже существует
 */
router.post('/', groupController.create)

/**
 * @swagger
 * /api/group:
 *   get:
 *     summary: Получает список всех групп
 *     tags: [Group]
 *     responses:
 *       200:
 *         description: Список всех групп
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор группы
 *                   number:
 *                     type: string
 *                     description: Номер группы
 *                   tutorName:
 *                     type: string
 *                     description: Имя куратора группы
 *                   studentsNumber:
 *                     type: integer
 *                     description: Количество студентов в группе
 *                   courseNumber:
 *                     type: integer
 *                     description: Номер курса, к которому принадлежит группа
 *                   facultyName:
 *                     type: string
 *                     description: Название факультета, к которому принадлежит группа
 */
router.get('/', groupController.getAll)

module.exports = router