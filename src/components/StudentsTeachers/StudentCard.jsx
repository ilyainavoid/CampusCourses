import {Badge, Button, Flex, message, Modal, Radio, Space, Typography} from "antd";
import styles from "./studentsteachers.module.css";
import {STUDENT_STATUSES} from "../../utils/consts/studentStatuses.js";
import {STUDENT_MARKS} from "../../utils/consts/studentMarks.js";
import {BADGE_STATUSES} from "../../utils/consts/badgeStatuses.js";
import {useLocation} from "react-router-dom";
import {editStudentStatus} from "../../api/editStudentStatus.js";
import React, {useState} from "react";
import {STATUSES} from "../../utils/consts/statuses.js";

const {Title, Text} = Typography;
export default function StudentCard({id, email, name, status, midtermResult, finalResult}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [studentStatus, setStudentStatus] = useState(status);
    const [userRole, setUserRole] = useState(localStorage.getItem('role').toString());
    const [finalResultOpen, setFinalResultOpen] = useState(false);
    const [midtermResultOpen, setMidtermResultOpen] = useState(false);
    const [isLoading, setIsLoading] =useState(false);
    const location = useLocation();

    const studentId = id;
    const hasRights = userRole === 'Admin' || userRole === 'Teacher'
    const courseId = location.state.id;
    const userEmail = localStorage.getItem('email');

    const notify = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const handleAccept = async () => {
        let response = await editStudentStatus(courseId, studentId, 'Accepted');
        if (response) {
            notify('success', 'Студент успешно зачислен');
            setStudentStatus('Accepted');
        }
        else {
            notify('error', 'Произошла ошибка при зачислении студента');
        }
    }

    const handleDecline = async () => {
        let response = await editStudentStatus(courseId, studentId, 'Decline');
        if (response) {
            notify('success', 'Заявка студента успешно отклонена');
            setStudentStatus('Declined')
        }
        else {
            notify('error', 'Произошла ошибка при отклонении заявки студента');
        }
    }

    const selectOptions = [
        { value: 'NotDefined', label: 'Отметки нет' },
        { value: 'Passed', label: 'Успешно пройдена' },
        { value: 'Failed', label: 'Провалена' }
    ];


    const midtermChange = () => {

    }

    const finalChange = () => {

    }

    return (
        <Flex className={styles.card} align="center" justify="space-between">
            {contextHolder}
            <Flex style={{padding: '10px'}} vertical width='50%'>
                <Title level={5}>{name}</Title>
                <Text>Статус: {STUDENT_STATUSES[status]()}</Text>
                <Text>{email}</Text>
            </Flex>

            <Flex width='50%'>
                {(status === 'Accepted' && userEmail === email) && (
                    <>
                        <Flex style={{padding: '10px'}} vertical>
                            <Text style={{marginRight: '5px'}}>Промежуточная аттестация:</Text>
                            <Badge status={midtermResult && BADGE_STATUSES[midtermResult]()} text={midtermResult && STUDENT_MARKS[midtermResult]()}/>
                        </Flex>
                        <Flex style={{padding: '10px'}} vertical>
                            <Text style={{marginRight: '5px'}}>Финальная аттестация:</Text>
                            <Badge status={finalResult && BADGE_STATUSES[finalResult]()} text={finalResult && STUDENT_MARKS[finalResult]()}/>
                        </Flex>
                    </>
                )}
                {(hasRights && status === 'Accepted') && (
                    <>
                        <Flex style={{padding: '10px'}} vertical>
                            <Text style={{marginRight: '5px', cursor: 'pointer'}} onClick={() => setMidtermResultOpen(true)}>Промежуточная аттестация:</Text>
                            <Badge status={midtermResult && BADGE_STATUSES[midtermResult]()} text={midtermResult && STUDENT_MARKS[midtermResult]()}/>
                        </Flex>
                        <Modal
                            title="Промежуточная аттестация"
                            open={midtermResultOpen}
                            onOk={midtermChange}
                            onCancel={() => setMidtermResultOpen(false)}
                            confirmLoading={isLoading}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    {selectOptions.map((option) => (<Radio value={option.value}>{option.label}</Radio>))}
                                </Space>
                            </Radio.Group>
                        </Modal>
                        <Flex style={{padding: '10px'}} vertical>
                            <Text style={{marginRight: '5px', cursor: 'pointer'}} onClick={() => setFinalResultOpen(true)}>Финальная аттестация:</Text>
                            <Badge status={finalResult && BADGE_STATUSES[finalResult]()} text={finalResult && STUDENT_MARKS[finalResult]()}/>
                        </Flex>
                        <Modal
                            title="Итоговая аттестация"
                            open={finalResultOpen}
                            onOk={finalChange}
                            onCancel={() => setFinalResultOpen(false)}
                            confirmLoading={isLoading}
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    {selectOptions.map((option) => (<Radio value={option.value}>{option.label}</Radio>))}
                                </Space>
                            </Radio.Group>
                        </Modal>
                    </>
                )}
                {status === 'InQueue' && (
                    <>
                        <Flex align="center" justify="flex-end" vertical>
                            <Button type="primary" style={{marginBottom: '10px', width: '100%'}} onClick={handleAccept}>Принять</Button>
                            <Button type="primary" danger onClick={handleDecline}>Отклонить</Button>
                        </Flex>
                    </>
                )}
            </Flex>

        </Flex>
    )
}