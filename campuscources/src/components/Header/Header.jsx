import {Header} from "antd/es/layout/layout.js";
import {Flex, Menu} from "antd";
import styles from './header.module.css';

export default function HeaderComponent() {

    const buttonsForMixed = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'myCourses', label: 'Мои курсы'},
        {key: 'courcesTaught', label: 'Преподаваемые курсы'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход', style: {marginLeft: 'auto'}}
    ]

    const buttonsForTeacher = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'courcesTaught', label: 'Преподаваемые курсы'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход', style: {marginLeft: 'auto'}}
    ]

    const buttonsForStudent = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'myCourses', label: 'Мои курсы'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход', style: {marginLeft: 'auto'}}
    ]

    const buttonsForGuest = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход', style: {marginLeft: 'auto'}}
    ]

    const buttonsForUnauthorized = [
        {key: 'signup', label: 'Регистрация', style: {marginLeft: 'auto'}},
        {key: 'signin', label: 'Вход', style: {marginLeft: 'auto'}}
    ]

    const isAuth = localStorage.getItem('token');

    const buttonsForUser = buttonsForMixed;

    const leftButtons = buttonsForUser.slice(0, Math.min(3, buttonsForUser.length));
    const rightButtons = buttonsForMixed.slice(-2);


    return (
        <Header className={styles.header}>
            <Flex style={{width: '50%'}}>
                <p style={{color: 'white', fontSize: '18px', marginTop: '-1px'}}>Кампусные курсы</p>
                <Menu theme="dark" mode="horizontal" items={leftButtons} style={{flex: 1, minWidth: 0}}/>
            </Flex>
            <Flex style={{width: '50%'}}>
                <Menu theme="dark" mode="horizontal" items={rightButtons} style={{flex: 1, minWidth: 0, justifyContent: 'end'}}/>
            </Flex>
        </Header>
    )
}