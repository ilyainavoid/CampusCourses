import {Header} from "antd/es/layout/layout.js";
import {Flex, Menu} from "antd";
import styles from './header.module.css';
import {ROUTES as routes} from "../../utils/consts/routes.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProfile} from "../../api/getProfile.js";

export default function HeaderComponent() {

    const navigate = useNavigate();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile(localStorage.getItem('token'));
                setEmail(data.email);

            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchData();
    }, []);

    const menuRoutes = {
        main: routes.root(),
        profile: routes.profile(),
        signin: routes.login(),
        signup: routes.registration(),
        coursesGroups: routes.groups()
    }

    const buttonsForMixed = [
        {key: 'main', label: 'Главная'},
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'myCourses', label: 'Мои курсы'},
        {key: 'courcesTaught', label: 'Преподаваемые курсы'},
        {key: 'profile', label: email, style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForTeacher = [
        {key: 'main', label: 'Главная'},
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'courcesTaught', label: 'Преподаваемые курсы'},
        {key: 'profile', label: email, style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForStudent = [
        {key: 'main', label: 'Главная'},
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'myCourses', label: 'Мои курсы'},
        {key: 'profile', label: email, style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForGuest = [
        {key: 'main', label: 'Главная'},
        {key: 'coursesGroups', label: 'Группы курсов'},
        {key: 'profile', label: email, style: {marginLeft: 'auto'}},
        {key: 'logout', label: 'Выход'}
    ]

    const buttonsForUnauthorized = [
        {key: 'main', label: 'Главная'},
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

    const handleMenuClick = (e) => {
        const path = menuRoutes[e.key];
        if (e.key === "logout") {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setTimeout(() => {
                navigate(routes.root())
            }, 1000);
        }
        else if (path) {
            navigate(path);
        }
    };

    return (
        <Header className={styles.header}>
            <Flex style={{width: '100%'}}>
                <Menu theme="dark" mode="horizontal" items={buttonsForUser} style={{width: '100%'}} onClick={handleMenuClick}/>
            </Flex>
        </Header>
    )
}