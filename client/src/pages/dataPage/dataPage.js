import style from './dataPage.module.css'
import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {Button, ConfigProvider, Input, Space, Table} from 'antd';
import {fetchAcademicPerformance, fetchStudents} from "../../http/studentAPI";
import Magnifier from "../../assets/Magnifier.png"
const DataPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [studentRows, setStudentRows] = useState([]);
    const [performanceRows, setPerformanceRows] = useState([]);

    useEffect(() => {
        const fetchAndSetStudents = async () => {
            const rows = await fetchStudents();
            setStudentRows(rows);
        };
        fetchAndSetStudents();
    }, []);

    useEffect(() => {
        const fetchAndSetAcademicPerformance = async () => {
            const rows = await fetchAcademicPerformance();
            setPerformanceRows(rows);
        };
        fetchAndSetAcademicPerformance();
    }, []);

    const totalArray = studentRows.map(obj1 => {
        const matchingObj2 = performanceRows.find(obj2 => obj2.id === obj1.academicPerformanceId);
        return { ...obj1, ...matchingObj2 };
    });

    console.log(totalArray);

    console.log(studentRows)
    console.log(performanceRows)


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#5016ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#b7b3ee',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            ...getColumnSearchProps('key'),
        },
        {
            title: 'Имя',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
            ...getColumnSearchProps('surname'),
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            ...getColumnSearchProps('gender'),
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthdate',
            key: 'birthdate',
            ...getColumnSearchProps('birthdate'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Группа',
            dataIndex: 'groupNumber',
            key: 'group',
            ...getColumnSearchProps('group'),
        },
        {
            title: 'Курс',
            dataIndex: 'courseNumber',
            key: 'course',
            ...getColumnSearchProps('course'),
        },
        {
            title: 'Факультет',
            dataIndex: 'facultyName',
            key: 'course',
            ...getColumnSearchProps('course'),
        },
        {
            title: 'Вид финансирования',
            dataIndex: 'fundingType',
            key: 'fundingType',
            ...getColumnSearchProps('fundingType'),
        },
        {
            title: 'Форма обучения',
            dataIndex: 'studyForm',
            key: 'studyForm',
            ...getColumnSearchProps('studyForm'),
        },
        {
            title: 'Уровень образования',
            dataIndex: 'educationLevel',
            key: 'educationLevel',
            ...getColumnSearchProps('educationLevel'),
        },
        {
            title: 'Количество курсов',
            dataIndex: 'classesNumber',
            key: 'classesNumber',
            ...getColumnSearchProps('classesNumber'),
        },
        {
            title: 'Средняя оценка',
            dataIndex: 'averageMark',
            key: 'averageMark',
            ...getColumnSearchProps('averageMark'),
        },

    ];

    return (
        <div className={style.wrap}>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <div className={style.upperRow}>
                    <h1>Информация о студентах</h1>
                </div>
                <img style={{marginLeft: 400, height: 240, objectFit: "contain"}} src={Magnifier}/>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#d5d2e7",
                                headerColor: "#35344b",
                            },
                        },
                    }}
                >
                <Table size = "small" className = {style.table} pagination={false} columns={columns} dataSource={totalArray}/>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default DataPage;