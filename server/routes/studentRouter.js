const Router = require('express')
const router = new Router()
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')
const checkJwtMiddleware = require('../middleware/checkJwtMiddleware')


/**
 * @swagger
 * /api/student/registration:
 *   post:
 *     summary: Регистрирует нового студента
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - surname
 *               - gender
 *               - birthdate
 *               - email
 *               - password
 *               - fundingType
 *               - studyForm
 *               - educationLevel
 *               - courseNumber
 *               - facultyName
 *               - academicPerformanceId
 *               - groupNumber
 *             properties:
 *               username:
 *                 type: string
 *               surname:
 *                 type: string
 *               gender:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               fundingType:
 *                 type: string
 *               studyForm:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *               courseNumber:
 *                 type: integer
 *               facultyName:
 *                 type: string
 *               academicPerformanceId:
 *                 type: integer
 *               groupNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешная регистрация, возвращается токен авторизации.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Ошибка запроса из-за некорректного email или пароля.
 *       409:
 *         description: Пользователь с таким email уже существует.
 */
router.post('/registration', studentController.registration)

/**
 * @swagger
 * /api/student/login:
 *   post:
 *     summary: Авторизует студента и возвращает токен
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email студента для входа
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль студента
 *     responses:
 *       200:
 *         description: Авторизация успешна, возвращается токен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Токен аутентификации
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неверный пароль
 */
router.post('/login', studentController.login)

/**
 * @swagger
 * /api/student/check:
 *   get:
 *     summary: Проверяет и обновляет токен авторизации студента
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Токен успешно проверен и обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Обновленный токен аутентификации
 *       401:
 *         description: Недействительный или истекший токен
 */
router.get('/auth', authMiddleware, studentController.check) //not used on client now

/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Возвращает список всех студентов
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Список студентов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Уникальный идентификатор студента
 *                   username:
 *                     type: string
 *                     description: Имя пользователя студента
 *                   surname:
 *                     type: string
 *                     description: Фамилия студента
 *                   gender:
 *                     type: string
 *                     description: Пол студента
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     description: Дата рождения студента
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Электронная почта студента
 *                   # Дополнительные поля...
 */
router.get('/', studentController.getAll)

/**
 * @swagger
 * /api/student/{email}:
 *   get:
 *     summary: Получает информацию о студенте по электронной почте
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Электронная почта студента
 *     responses:
 *       200:
 *         description: Данные о студенте
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Уникальный идентификатор студента
 *                 username:
 *                   type: string
 *                   description: Имя пользователя студента
 *                 surname:
 *                   type: string
 *                   description: Фамилия студента
 *                 gender:
 *                   type: string
 *                   description: Пол студента
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   description: Дата рождения студента
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Электронная почта студента
 *       404:
 *         description: Студент с такой электронной почтой не найден
 */
router.get('/:email', studentController.getOne)

/**
 * @swagger
 * /api/student/{email}:
 *   put:
 *     security:
 *       - Authorization: []
 *     summary: Updates the details of an existing student.
 *     description: This endpoint allows for updating the details of a student based on their email. It can only be accessed by the student themselves.
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path 
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the student to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newGender:
 *                 type: string
 *                 description: The new gender of the student.
 *               newBirthdate:
 *                 type: string
 *                 format: date
 *                 description: The new birthdate of the student.
 *               newGroupNumber:
 *                 type: string
 *                 description: The new group number of the student.
 *               newCourseNumber:
 *                 type: integer
 *                 description: The new course number of the student.
 *               newFundingType:
 *                 type: string
 *                 description: The new funding type of the student.
 *               newFacultyName:
 *                 type: string
 *                 description: The new faculty name of the student.
 *               newStudyForm:
 *                 type: string
 *                 description: The new study form of the student.
 *               newEducationLevel:
 *                 type: string
 *                 description: The new education level of the student.
 *     responses:
 *       200:
 *         description: The student's details were successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Данные успешно обновлены!
 *       403:
 *         description: Access denied. User is not authorized to update this student's details.
 *       400:
 *         description: Bad request. The user does not exist.
 */
router.put('/:email', checkJwtMiddleware, studentController.updateOne);

module.exports = router