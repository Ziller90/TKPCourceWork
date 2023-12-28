import React, {useContext, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import style from './Account.module.css'
import dayjs from "dayjs";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {
    createCourse, createFaculty, createGroup,
    fetchFaculty,
    fetchGroup,
    fetchOneStudent,
    updateOneStudent
} from "../../http/studentAPI";

const {Option} = Select;


const Account = () => {
    const history = useNavigate()
    const [newGender, setNewGender] = useState('')
    const [newBirthdate, setNewBirthdate] = useState('')
    const [newGroupNumber, setNewGroupNumber] = useState('')
    const [newCourseNumber, setNewCourseNumber] = useState('')
    const [newFundingType, setNewFundingType] = useState('')
    const [newFacultyName, setNewFacultyName] = useState('')
    const [newTutorName, setNewTutorName] = useState('')
    const [newGroupStudentsNumber, setNewGroupStudentsNumber] = useState('')
    const [newFacultyStudentsNumber, setNewFacultyStudentsNumber] = useState('')
    const [newDean, setNewDean] = useState('')
    const [newStudyForm, setNewStudyForm] = useState('')
    const [newEducationLevel, setNewEducationLevel] = useState('')
    const {student} = useContext(Context)
    const email = student.email;
    const [rows, setRows] = useState([]);
    const [groupExists, setGroupExists] = useState(false)
    const [facultyExists, setFacultyExists] = useState(false)

    const [group, setGroup] = useState([])
    const [faculty, setFaculty] = useState([])

    useEffect(() => {
        const fetchAndSetGroupExistance = async () => {
            const rows = await fetchGroup();
            const result = await rows.find(group => group.number === newGroupNumber);
            if (result) {
                setGroupExists(true)
                setGroup(result)
                setNewFacultyName(result.facultyName)
                setNewCourseNumber(result.courseNumber)
                setNewGroupStudentsNumber(result.studentsNumber)
            }
            else {
                setGroup([])
                setGroupExists(false)
                setNewFacultyName("")
                setNewCourseNumber("")
                setNewGroupStudentsNumber("")
            }
        }
        fetchAndSetGroupExistance()

    }, [newGroupNumber])


    useEffect(() => {
        const fetchAndSetFacultyExistance = async () => {
            const rows = await fetchFaculty();
            const result = rows.find(faculty => faculty.name === newFacultyName);
            if (result)
            {
                setFaculty(result)
                setFacultyExists(true)
                setNewDean(result.dean)
                setNewFacultyStudentsNumber(result.studentsNumber)
            }
            else {
                setFaculty([])
                setFacultyExists(false)
                setNewDean("")
                setNewFacultyStudentsNumber("")
            }
        }
        fetchAndSetFacultyExistance()

    }, [newFacultyName])


    useEffect(() => {
        console.log('state has changed')
    }, [groupExists, facultyExists])

    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const rows = await fetchOneStudent(email);
            setRows(rows);
        };
        fetchAndSetStudents();
    }, []);


    useEffect(() => {
        if (rows) {
            setNewGender(rows.gender);
            setNewBirthdate(rows.birthdate);
            setNewGroupNumber(rows.groupNumber);
            setNewCourseNumber(rows.courseNumber);
            setNewFundingType(rows.fundingType);
            setNewStudyForm(rows.studyForm);
            setNewEducationLevel(rows.educationLevel);
        }
    }, [rows]);


    const Save = async () => {
        await createCourse({number: newCourseNumber});
        await createFaculty(newFacultyName, newFacultyStudentsNumber, newDean);
        await createGroup(newGroupNumber, newTutorName, newGroupStudentsNumber, newCourseNumber, newFacultyName);
        await updateOneStudent(email, newGender, newBirthdate, newGroupNumber, newCourseNumber, newFundingType, newFacultyName, newStudyForm, newEducationLevel)
        alert("Успешно сохранено!");
    }

    const logOut = () => {
        student.setStudent({})
        student.setIsAuth(false)
        history('/')
    }



    return (
        <div className={style.wrapper}>
            {rows.username &&
            <div className={style.card}>
                <div
                    className={style.title}>{rows.username} {' '} {rows.surname}
                </div>

                <div className={style.field}> Пол:
                    <Select onChange={value => setNewGender(value)} style={{width: 250}} defaultValue={rows.gender} placeholder="Пол">
                        <Option value="Мужской">Мужской</Option>
                        <Option value="Женский">Женский</Option>
                    </Select>
                </div>

                <div className={style.field}> Дата рождения:
                    <DatePicker onChange={e => setNewBirthdate(e.target.value)} style={{width: 250}} defaultValue={dayjs(rows.birthdate, 'DD-MM-YYYY')}/>
                </div>

                <div className={style.field}> Номер группы:
                    <Input onChange={e => setNewGroupNumber(e.target.value)} style={{width: 250}} defaultValue={rows.groupNumber}/>
                </div>
                {!groupExists ?
                    <div className={style.field}> Имя куратора:
                        <Input style={{width: 250}} defaultValue={""} onChange={e => setNewTutorName(e.target.value)} placeholder="Имя куратора"/>
                    </div> :
                    <div className={style.field}> Имя куратора:
                        <div style={{width: 250, textAlign: "right"}}>{group.tutorName}</div>
                    </div>
                }
                {!groupExists ?
                    <div className={style.field}> Количество студентов в группе:
                        <Input style={{width: 250}} defaultValue={""} onChange={e => setNewGroupStudentsNumber(e.target.value)} placeholder="Количество студентов в группе"/>
                    </div> :
                    <div className={style.field}> Количество студентов в группе:
                        <div style={{width: 250, textAlign: "right"}}>{group.studentsNumber}</div>
                    </div>
                }
                {!groupExists ?
                    <div className={style.field}> Курс:
                        <Input style={{width: 250}} defaultValue={""}  onChange={e => setNewCourseNumber(e.target.value)} placeholder="Курс"/>
                    </div> :
                    <div className={style.field}> Курс:
                        <div style={{width: 250, textAlign: "right"}}>{group.courseNumber}</div>
                    </div>
                }
                {!groupExists ?
                    <div className={style.field}> Факультет:
                        <Input style={{width: 250}} defaultValue={""} onChange={e => setNewFacultyName(e.target.value)} placeholder="Факультет"/>
                    </div> :
                    <div className={style.field}> Факультет:
                        <div style={{width: 250, textAlign: "right"}}>{rows.facultyName}</div>
                    </div>
                }
                {(!groupExists && !facultyExists) ?
                    <div className={style.field}> Декан:
                        <Input style={{width: 250}} defaultValue={""} onChange={e => setNewDean(e.target.value)} placeholder="Декан"/>
                    </div> :
                    <div className={style.field}> Декан:
                        <div style={{width: 250, textAlign: "right"}}>{faculty.dean}</div>
                    </div>
                }
                {(!groupExists && !facultyExists) ?
                    <div className={style.field}> Количество студентов <br/> на факультете:
                        <Input style={{width: 250}} defaultValue={""} onChange={e => setNewFacultyStudentsNumber(e.target.value)} placeholder="Количество студентов на факультете"/>
                    </div> :
                    <div className={style.field}> Количество студентов <br/> на факультете:
                        <div style={{width: 250, textAlign: "right", backgroundColor: ""}}>{faculty.studentsNumber}</div>
                    </div>
                }

                <div className={style.field}> Форма обучения:
                    <Select onChange={value => setNewStudyForm(value)} style={{width: 250}} defaultValue={rows.studyForm} placeholder="Форма обучения">
                        <Option value="Очная">Очная</Option>
                        <Option value="Заочная">Заочная</Option>
                    </Select>
                </div>

                <div className={style.field}> Вид финансирования:
                    <Select onChange={value => setNewFundingType(value)} style={{width: 250}} defaultValue={rows.fundingType}
                            placeholder="Вид финансирования">
                        <Option value="Бюджетная форма">Бюджетная форма</Option>
                        <Option value="Платная форма">Платная форма</Option>
                    </Select>
                </div>

                <div className={style.field}> Уровень образования:
                    <Select onChange={value => setNewEducationLevel(value)} style={{width: 250}} defaultValue={rows.educationLevel}
                            placeholder="Уровень образования">
                        <Option value="Бакалавриат">Бакалавриат</Option>
                        <Option value="Магистратура">Магистратура</Option>
                        <Option value="Аспирантура">Аспирантура</Option>
                        <Option value="Специалитет">Специалитет</Option>
                    </Select>
                </div>


                <div className={style.button}>
                    <Button onClick={() => logOut()} type="primary" htmlType="submit" style={{background: "#dc4840", width: "150px"}}>
                        Выйти из аккаунта
                    </Button>

                    <Button onClick={Save} type="primary" htmlType="submit" style={{width: "180px"}}>
                        Сохранить изменения
                    </Button>
                </div>
            </div>
            }

        </div>
    );

};

export default Account;