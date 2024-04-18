import {Col, Form, Input, Modal, Radio, Row, Select} from "antd";
import ReactQuill from "react-quill";
import React, {useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {editCourseAsAdmin} from "../../api/editCourseAsAdmin.js";
import {getCourseDetails} from "../../api/getCourseDetails.js";
import {editCourseAsTeacher} from "../../api/editCourseAsTeacher.js";

export default function EditCourseAsTeacher({isOpen, setOpen, courseDetails, setDetails, notify}) {
    const formRef = useRef(null);
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [requirementsValue, setRequirementsValue] = useState('');
    const [annotationsValue, setAnnotationsValue] = useState('');
    const location = useLocation();
    const courseId = location.state.id;

    const handleOk = async () => {
        formRef.current.validateFields()
            .then(async values => {
                console.log('Form values:', values);
                let response = await editCourseAsTeacher(courseId, values);
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

    const handleCancel = () => {
        setOpen(false);
    };

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

            </Form>
        </Modal>
    )
}