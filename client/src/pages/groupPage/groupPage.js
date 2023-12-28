import style from './groupPage.module.css'
import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {Button, ConfigProvider, Input, Space, Table} from 'antd';
import {fetchGroup, fetchStudents} from "../../http/studentAPI";

const GroupPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetchAndSetGroups = async () => {
            const rows = await fetchGroup();
            setRows(rows);
        };
        fetchAndSetGroups();
    }, []);

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
                    color: filtered ? '#1677ff' : undefined,
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
                        backgroundColor: '#abdbff',
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
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',
            ...getColumnSearchProps('number'),
        },
        {
            title: 'Имя куратора',
            dataIndex: 'tutorName',
            key: 'tutorName',
            ...getColumnSearchProps('tutorName'),
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Количество студентов',
            dataIndex: 'studentsNumber',
            key: 'studentsNumber',
            ...getColumnSearchProps('studentsNumber'),
        },
        {
            title: 'Курс',
            dataIndex: 'courseNumber',
            key: 'courseNumber',
            ...getColumnSearchProps('courseNumber'),
        },
        {
            title: 'Факультет',
            dataIndex: 'facultyName',
            key: 'facultyName',
            ...getColumnSearchProps('facultyName'),
        },

    ];

    return (
        <div className={style.wrap}>
            <div>
                <div className={style.upperRow}>
                    <h1>Информация о группах</h1>
                </div>
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
                <Table className = {style.table} pagination={false} columns={columns} dataSource={rows}/>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default GroupPage;