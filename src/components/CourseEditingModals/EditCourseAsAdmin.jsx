import {Col, Form, Input, Modal, Radio, Row, Select} from "antd";
import ReactQuill from "react-quill";
import React, {useEffect, useRef, useState} from "react";
import {createCourse} from "../../api/createCourse.js";
import {getCourses} from "../../api/getCourses.js";
import {getGroups} from "../../api/getGroups.js";
import {getUsers} from "../../api/getUsers.js";
import {editCourseAsAdmin} from "../../api/editCourseAsAdmin.js";
import {useLocation} from "react-router-dom";
import {getCourseDetails} from "../../api/getCourseDetails.js";

export default function EditCourseAsAdmin({isOpen, setOpen, courseDetails, setDetails, notify}) {
    const formRef = useRef(null);
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [users, setUsers] = useState([]);
    const [requirementsValue, setRequirementsValue] = useState('');
    const [annotationsValue, setAnnotationsValue] = useState('');
    const location = useLocation();
    const courseId = location.state.id;

    useEffect(() => {
        async function fetchData(){
            let users = await getUsers();
            setUsers(users);
        }
        fetchData();
    }, []);

    const handleOk = async () => {
        formRef.current.validateFields()
            .then(async values => {
                console.log('Form values:', values);
                let response = await editCourseAsAdmin(courseId, values);
                if (response) {
                    let data = getCourseDetails(courseId);
                    setDetails(data);
                    notify('error', 'Возникла ошибка при обновлении данных')
                    setTimeout(() => {
                        setOpen(false);
                        setLoading(false);
                        form.resetFields();
                    }, 2000);
                }
                else {
                    notify('error', 'Возникла ошибка при обновлении данных')
                    setTimeout(() => {
                        setOpen(false);
                        setLoading(false);
                        form.resetFields();
                    }, 2000);
                }
            })
            .catch(errorInfo => {
                console.error('Validation failed:', errorInfo);
                notify('error', 'Ошибка валидации!')
            });
    }

    const selectOptions = (userRole === 'Admin' || userRole === 'Teacher') ? users.map(item => ({
        value: item.id,
        label: item.fullName
    })) : [];

    const handleCancel = () => {
        setOpen(false);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (

        <Modal
            title="Редактирование курса"
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={isLoading}
        >
            <Form
                form={form}
                layout='vertical'
                name='courseCreation'
                scrollToFirstError
                ref={formRef}
            >
                <Form.Item
                    name="name"
                    label="Название курса"
                    rules={[
                        {
                            required: true,
                            message: 'Введите название курса'
                        }
                    ]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    name="startYear"
                    label="Год начала курса"
                    rules={[
                        {
                            required: true,
                            message: 'Введите год начала курса'
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: 'Некорректно введенный год!'
                        }
                    ]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    name="maximumStudentsCount"
                    label="Общее количество мест"
                    rules={[
                        {
                            required: true,
                            message: 'Введите общее количество мест'
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: 'Некорректно введенное количество мест!'
                        }
                    ]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    name="semester"
                    label="Семестр"
                    rules={[
                        {
                            required: true,
                            message: 'Введите требования',
                        }
                    ]}
                >
                    <Radio.Group>
                        <Row>
                            <Col span={12}>
                                <Radio value="Spring">Весенний</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value="Autumn">Осенний</Radio>
                            </Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="requirements"
                    label="Требования"
                    rules={[
                        {
                            required: true,
                            message: 'Введите требования'
                        }
                    ]}
                >
                    <ReactQuill theme="snow" value={requirementsValue} onChange={setRequirementsValue} />
                </Form.Item>
                <Form.Item
                    name="annotations"
                    label="Аннотации"
                    rules={[
                        {
                            required: true,
                            message: 'Введите аннотации'
                        }
                    ]}
                >
                    <ReactQuill theme="snow" value={annotationsValue} onChange={setAnnotationsValue} />
                </Form.Item>
                <Form.Item
                    name="mainTeacherId"
                    label="Основной преподаватель курса"
                    rules={[
                        {
                            required: true,
                            message: 'Выберите преподавателя'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Выберите преподавателя"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={selectOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}