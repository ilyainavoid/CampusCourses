import {useLocation, useParams} from "react-router-dom";
import {Button, Checkbox, Col, Flex, Form, Input, message, Modal, Radio, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {getGroups} from "../../api/getGroups.js";
import CourseInGroup from "../../components/CourseInGroup/CourseInGroup.jsx";
import { Typography } from 'antd';
import {getCourses} from "../../api/getCourses.js";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {getUsers} from "../../api/getUsers.js";
import {createCourse} from "../../api/createCourse.js";
import {getRole} from "../../api/getRole.js";

const { Title } = Typography;

export default function GroupCoursesPage() {
    const location = useLocation();
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [groupName, setGroupName] = useState('');
    const [courses, setCourses] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [requirementsValue, setRequirementsValue] = useState('');
    const [annotationsValue, setAnnotationsValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [users, setUsers] = useState([]);
    const formRef = useRef(null);

    let groupId = location.state.id;

    useEffect(() => {
        async function fetchData(){
            let groups = await getGroups();
            let item = groups.find(item => item.id === groupId)
            setGroupName(item.name);
            let groupCourses = await getCourses(groupId);
            setCourses(groupCourses);
            let users = await getUsers();
            setUsers(users);
        }
        fetchData();
    }, []);

    const selectOptions = (userRole === 'Admin' || userRole === 'Teacher') ? users.map(item => ({
        value: item.id,
        label: item.fullName
    })) : [];
    const handleOk = async () => {
        formRef.current.validateFields()
            .then(async values => {
                console.log('Form values:', values);
                let response = await createCourse(groupId, values);
                if (!response) {
                    notify('error', 'Произошла ошибка при создании курса!')
                    setTimeout(() => {
                        setOpen(false);
                        setLoading(false);
                        form.resetFields();
                    }, 2000);
                }
                else {
                    notify('success', 'Курс успешно создан!')
                    let groupCourses = await getCourses(groupId);
                    setCourses(groupCourses);

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

    const notify = (type, message) =>{
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const showModal = () => {
        setOpen(true);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Flex align="center" justify="center" style={{padding: '25px'}}>
            {contextHolder}
            <Flex style={{width: '60%'}} vertical>
                <Flex>
                    <Title>{groupName}</Title>
                    {userRole === 'Admin' && <Button  type="dashed" onClick={showModal} style={{marginLeft: '10px', marginTop: '10px'}}><PlusOutlined/> Создать курс</Button>}
                </Flex>
                <Flex vertical>
                    {courses && courses.map((group) => (
                        <CourseInGroup group={group}></CourseInGroup>
                    ))}
                </Flex>
            </Flex>
            <Modal
                title="Создание курса"
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
        </Flex>
    )
}