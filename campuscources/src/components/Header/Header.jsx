import {Header} from "antd/es/layout/layout.js";
import {Flex, Menu} from "antd";
import styles from './header.module.css';

export default function HeaderComponent() {

    const buttonsForMixed = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'myCourses', label: 'Мои курсы'},
        {key: 'courcesTaught', label: 'Преподаваемые курсы'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForTeacher = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'courcesTaught', label: 'Преподаваемые курсы'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForStudent = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'myCourses', label: 'Мои курсы'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForGuest = [
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'profile', label: 'example@email.com', style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForUnauthorized = [
        {key: 'signup', label: 'Регистрация', style: {marginLeft: 'auto'}},
        {key: 'signin', label: 'Вход'}
    ]

    const role = localStorage.getItem('role');
    let buttonsForUser = buttonsForUnauthorized;

    switch(role) {
        case 'Student': buttonsForUser = buttonsForStudent; break;
        case 'Teacher': buttonsForUser = buttonsForTeacher; break;
        case 'Mixed': buttonsForUser = buttonsForMixed; break;
        case 'Guest': buttonsForUser = buttonsForGuest; break;
    }


    return (
        <Header className={styles.header}>
            <Flex style={{width: '100%'}}>
                <Menu theme="dark" mode="horizontal" items={buttonsForUser} style={{width: '100%'}}/>
            </Flex>
        </Header>
    )
}