import React, {useContext} from 'react';
import {Button, ConfigProvider, Layout, Menu, theme} from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import style from "../../pages/dataPage/dataPage.module.css";

// import styles from './Head.css'
const Head = () => {

    const history = useNavigate()
    const {student} = useContext(Context)
    console.log(student.isAuth)
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#6e6b9f"
                },
            }}
        >
        <Layout className="layout">
            {student.isAuth ?
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{justifyContent: 'center'}}
                >
                    <MenuItem><NavLink to="/">Студенты</NavLink></MenuItem>
                    <MenuItem><NavLink to="/groups">Группы</NavLink></MenuItem>
                    <MenuItem><NavLink to="/faculties">Факультеты</NavLink></MenuItem>
                    <MenuItem style={{position: "absolute", right: 10}}>
                        <NavLink to="/account">
                        <Button type="primary" htmlType="submit"
                                style={{width: "140px"}}>
                            Личный кабинет
                        </Button>
                        </NavLink>
                    </MenuItem>
                </Menu>
                :
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{justifyContent: 'center'}}
                >
                    <MenuItem><NavLink to="/">Студенты</NavLink></MenuItem>
                    <MenuItem><NavLink to="/groups">Группы</NavLink></MenuItem>
                    <MenuItem><NavLink to="/faculties">Факультеты</NavLink></MenuItem>
                    <MenuItem><NavLink to="/login">Вход</NavLink></MenuItem>
                    <MenuItem><NavLink to="/registration">Регистрация</NavLink></MenuItem>

                </Menu>
                    }

                </Layout>
        </ConfigProvider>
                );
            };

export default Head;