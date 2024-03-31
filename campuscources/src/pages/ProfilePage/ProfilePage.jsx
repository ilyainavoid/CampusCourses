import {Button, Card, DatePicker, Flex, Form, Input, message, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {getProfile} from "../../api/getProfile.js";
import moment from "moment/moment.js";
import styles from './profile.module.css';
import { EditFilled } from '@ant-design/icons';
import {editProfile} from "../../api/editProfile.js";

const {Title} = Typography;

export default function ProfilePage() {
    const [form] = Form.useForm();
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [saveLoading, setLoadingSave] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile(localStorage.getItem('token'));
                data.birthDate = moment(data.birthDate, 'YYYY-MM-DD');
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue(userInfo);
    };

    const handleCancelEdit = () =>{
        form.setFieldsValue(userInfo);
        setIsEditing(false)
    }
    const notify = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const onFinish = async (values) => {
        setLoadingSave(true);
        let userData = userInfo;
        userData.birthDate = values.birthDate;
        userData.fullName = values.fullName;
        let response = await editProfile(localStorage.getItem('token'), values);
        if (response) {
            notify('success', 'Данные обновлены успешно!')
        }
        else {
            notify('error', 'Произошла ошибка!')
        }
        setTimeout(() => {
            setLoadingSave(false);
            setIsEditing(false);
            setUserInfo(userInfo);
        }, 1000);
    }

    const disabledDate = (current) => {
        return current && current > moment().endOf('day');
    };

    return (
        <Flex className={styles.container}>
            {contextHolder}
            <Card className={styles.card}>
                {userInfo && (
                    <Form
                        form={form}
                        layout='vertical'
                        name=""
                        initialValues={userInfo}
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        <Title style={{textAlign: 'center'}}>Профиль</Title>
                        <Form.Item name="fullName"
                                   label="ФИО"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Введите ФИО!',
                                       },
                                       {
                                           pattern: /^[A-ZА-Я][a-zа-я]+\s[A-ZА-Я][a-zа-я]+\s[A-ZА-Я][a-zа-я]+$/,
                                           message: 'Некорректно введенное ФИО!',
                                       },
                                   ]}>
                            <Input disabled={!isEditing}/>
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
                            <Input disabled={true}/>
                        </Form.Item>
                        <Form.Item name="birthDate"
                                   label="Дата рождения"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Выберите дату рождения!',
                                       },
                                   ]}>
                            <DatePicker disabled={!isEditing} disabledDate={disabledDate} style={{width: '100%'}}/>
                        </Form.Item>
                        {isEditing ? (
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={saveLoading}>Сохранить</Button>
                                <Button style={{marginLeft: 10}} onClick={handleCancelEdit}>Отменить</Button>
                            </Form.Item>
                        ) : (
                            <Button type="primary" onClick={handleEdit}><EditFilled />Редактировать</Button>
                        )}
                    </Form>
                )}
            </Card>
        </Flex>
    );
}