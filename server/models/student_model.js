const sequelize = require('../db');
const {DataTypes} = require('sequelize');

// Определение модели для факультета
const Faculty = sequelize.define('faculty', {
    name: { type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false },
    studentsNumber: { type: DataTypes.INTEGER },
    dean: { type: DataTypes.STRING, allowNull: false }
});

// Определение модели для курса
const Course = sequelize.define('course', {
    number: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
});

// Определение модели для группы
const Group = sequelize.define('group', {
    number: { type: DataTypes.STRING, primaryKey: true },
    tutorName: { type: DataTypes.STRING, allowNull: false },
    studentsNumber: { type: DataTypes.INTEGER },
});

const AcademicPerformance = sequelize.define('academicPerformance', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    classesNumber: { type: DataTypes.INTEGER, allowNull: false },
    averageMark: { type: DataTypes.FLOAT, allowNull: false  },
});

// Изменение модели студента для связи с курсами и группами
const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    fundingType: { type: DataTypes.STRING, allowNull: false },
    studyForm: { type: DataTypes.STRING, allowNull: false },
    educationLevel: { type: DataTypes.STRING, allowNull: false },

});

// Связи между сущностями
Course.hasMany(Group)
Group.belongsTo(Course)

Faculty.hasMany(Group)
Group.belongsTo(Faculty)

Course.hasOne(Student)
Student.belongsTo(Course)

AcademicPerformance.hasOne(Student)
Student.belongsTo(AcademicPerformance)

Group.hasOne(Student)
Student.belongsTo(Group)

Faculty.hasOne(Student)
Student.belongsTo(Faculty)


module.exports = {
    Faculty,
    Course,
    Group,
    Student,
    AcademicPerformance
};