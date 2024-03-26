import {Button, Card, Flex, Form, Input, message, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES as routes} from "../../utils/consts/routes.js";
import React, {useState} from "react";
import styles from "./authorization.module.css"
import {authorize} from "../../api/authorize.js";
import {getRole} from "../../api/getRole.js";
import {roleDeterminant} from "../../utils/functions/roleDeterminant.js";

const {Title} = Typography;

export default function AuthorizationPage() {
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
        setLoading(true);
        console.log(values);
        let token = await authorize(values);
        console.log(token)
        if (token) {
            notify('success',
                'Вы успешно вошли');
            localStorage.setItem("token", token);
            let roles = await getRole(token);
            localStorage.setItem("role", roleDeterminant(roles));
            setTimeout(() => {
                setLoading(false);
                navigate(routes.root());
            }, 1000);
        } else {
            notify('error',
                'Неверный логин или пароль')
        }
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
                    <Title style={{textAlign: 'center'}}>Авторизация</Title>
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

                    <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Войти!
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{textAlign: 'center'}}>
                    Еще нет аккаунта? <Link to={routes.registration()}>Создать</Link>
                </div>
            </Card>
        </Flex>
    )
}
