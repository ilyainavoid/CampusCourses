import React, {useState} from 'react';
import {Button, Card, DatePicker, Flex, Form, Input, message, Typography,} from 'antd';
import styles from './registration.module.css'
import moment from "moment";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../../api/register.js";
import {ROUTES as routes} from "../../utils/consts/routes.js";
import {getRole} from "../../api/getRole.js";
import {roleDeterminant} from "../../utils/functions/roleDeterminant.js";

const {Title} = Typography;
export default function RegistrationPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const notify = (type, message) =>{
        messageApi.open({
            type: type,
            content: message,
        });
    }
    const onFinish = async (values) => {
        console.log(`Токен который был положен ${localStorage.getItem('token')}`)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        values.birthDate = moment(values.birthDate).toISOString();
        console.log(values.birthDate)
        values.fullName = `${values.surname} ${values.name} ${values.patronymic}`;
        delete values.name;
        delete values.surname;
        delete values.patronymic;
        console.log(values)
        let token = await register(values);
        if (token) {
            notify('success',
                'Вы успешно зарегестрировались!');
            localStorage.setItem("token", token);
            console.log(token);
            let roles = await getRole(token);
            localStorage.setItem("role", roleDeterminant(roles))
            setTimeout(() => {
                navigate(routes.root())
            }, 1000);
        } else {
            notify('error',
                'Возникла ошибка!')
        }
    }

    const disabledDate = (current) => {
        return current && current > moment().endOf('day');
    };


    return (
        <Flex className={styles.container}>
            {contextHolder}
            <Card className={styles.card}>
                <Form
                    form={form}
                    layout='vertical'
                    name="registration"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Title style={{textAlign: 'center'}}>Регистрация</Title>
                    <Form.Item name="surname"
                               label="Фамилия"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите фамилию!',
                                   },
                                   {
                                       pattern: /^[A-ZА-Я][a-zа-я]*$/,
                                       message: 'Некорректно введенная фамилия!',
                                   },
                               ]}>
                        <Input placeholder="Введите фамилию"/>
                    </Form.Item>
                    <Form.Item name="name"
                               label="Имя"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите имя!',
                                   },
                                   {
                                       pattern: /^[A-ZА-Я][a-zа-я]*$/,
                                       message: 'Некорректно введенное имя!',
                                   },
                               ]}>
                        <Input placeholder="Введите имя"/>
                    </Form.Item>
                    <Form.Item name="patronymic"
                               label="Отчество"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Введите отчество!',
                                   },
                                   {
                                       pattern: /^[A-ZА-Я][a-zа-я]*$/,
                                       message: 'Некорректно введенное отчество!',
                                   },
                               ]}>
                        <Input placeholder="Введите отчество"/>
                    </Form.Item>
                    <Form.Item name="birthDate"
                               label="Дата рождения"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Выберите дату рождения!',
                                   },
                               ]}>
                        <DatePicker disabledDate={disabledDate} style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'Некорректный адрес эл. почты!',
                            },
                            {
                                required: true,
                                message: 'Ввдеите адрес эл. почты!',
                            },
                        ]}
                    >
                        <Input placeholder="Введите адрес эл.почты"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль!',
                            },
                            {
                                pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
                                message: 'Пароль должен содержать хотя бы одну цифру и быть не менее 6 символов!',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Введите пароль"/>
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Подтвердите пароль"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Подтвердите пароль!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Введите пароль еще раз"/>
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Зарегистрироваться!
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{textAlign: 'center'}}>
                    Уже есть аккаунт? <Link to={routes.login()}>Войти</Link>
                </div>
            </Card>
        </Flex>
    )
};