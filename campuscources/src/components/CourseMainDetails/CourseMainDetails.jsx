import {Button, Flex, Input, List, message, Modal, Radio, Select, Space, Typography} from "antd";
import {EditOutlined} from "@ant-design/icons";
import styles from './maindetails.module.css'
import {STATUSES} from "../../utils/consts/statuses.js";
import React, {useState} from "react";
import {translateSemester} from "../../utils/functions/translateSemester.js";
import {editStatus} from "../../api/editStatus.js";
import {translateStatus} from "../../utils/functions/translateStatus.js";
import {useLocation} from "react-router-dom";
import {signUpForCourse} from "../../api/signUpForCourse.js";
import {getCourseDetails} from "../../api/getCourseDetails.js";

const { Title, Text } = Typography;

export default function CourseMainDetails({courseDetails, notify}) {
    const [isStatusBeingEdited, setStatusBeingEdited] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [status, setStatus] = useState(courseDetails.status);
    const [selectedOption, setSelectedOption] = useState(courseDetails.status);
    const [thisCourseDetails, setThisCourseDetails] = useState(courseDetails);
    const location = useLocation()

    const courseId = location.state.id;

    const userRole = localStorage.getItem('role');
    const hasRight = userRole === 'Admin' || userRole === 'Teacher'

    const selectOptions = Object.keys(STATUSES).map((key) => ({
        value: key,
        label: STATUSES[key]
    }));

    const listData = [
        {
            title: 'Учебный год',
            description: courseDetails.startYear
        },
        {
            title: 'Семестр',
            description: translateSemester(courseDetails.semester)
        },
        {
            title: 'Всего мест',
            description: courseDetails.maximumStudentsCount
        },
        {
            title: 'Студентов зачислено',
            description: courseDetails.studentsEnrolledCount.toString()
        },
        {
            title: 'Заявок на рассмотрении',
            description: courseDetails.studentsInQueueCount.toString()
        }
    ]

    const handleOk = async (selectedStatus) => {
        setLoading(true);
        let response = await editStatus(courseDetails.id, selectedStatus);
        if (!response) {
            notify('error', 'Возникла ошибка при изменении статуса!');
        }
        else {
            if(response.status == null) {
                notify('error', 'Нельзя изменить статус курса на предыдущий!')
            }
            else {
                notify('success', 'Статус изменен успешно!');
                setStatus(selectedStatus);
            }
        }
        setTimeout(() => {
            setLoading(false);
            setStatusBeingEdited(false);
            setSelectedOption(status);
        }, 1000);
    }

    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
    };

    const signupForCourse = async () => {
        setButtonLoading(true)
        let response = await signUpForCourse(courseId);
        if (response) {
            notify('success', 'Заявка на зачисление подана');
            let response = await getCourseDetails(courseId);
            if (response) {
                setThisCourseDetails(response);
            }
            else {
                notify('error', 'Возникла ошибка при обновлении данных курса')
            }
        }
        else {
            notify('error', 'Возникла ошибка');
        }
        setTimeout(() => {
            setButtonLoading(false);
        }, 1000);
    }

    return (
        <Flex vertical style={{width: '100%'}}>
            <Flex className={styles.details} vertical>
                <Flex style={{width: '100%'}}>
                    {hasRight ?
                        (<>
                            <Button type="dashed" onClick={() => {setStatusBeingEdited(true)}} icon={<EditOutlined />}/>
                            <Title level={4} style={{marginLeft: '10px'}}>Статус курса</Title>
                            <Select options={selectOptions} value={status} disabled={!isStatusBeingEdited} className={styles.selectStatus}></Select>
                        </>) :
                        (<>
                            <Flex align="center" style={{width: '100%'}} justify="space-between">
                                <Title level={5} style={{marginLeft: '10px'}}>Статус курса: {translateStatus(status)}</Title>
                                {status === 'OpenForAssigning' && <Button onClick={signupForCourse} loading={isButtonLoading}>Записаться на курс</Button>}
                            </Flex>
                        </>)
                    }

                </Flex>
                <Flex style={{width: '100%'}}>
                    <List
                        style={{width: '100%'}}
                        itemLayout="horizontal"
                        dataSource={listData}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Flex>
            </Flex>
            <Modal
                title="Создание группы"
                open={isStatusBeingEdited}
                onOk={() => handleOk(selectedOption)}
                onCancel={() => {setStatusBeingEdited(false)}}
                confirmLoading={isLoading}
            >
                <Radio.Group value={selectedOption} onChange={handleRadioChange}>
                    <Space direction="vertical">
                        {selectOptions.map((option) => (option.value !== 'Created' && <Radio value={option.value}>{option.label}</Radio>))}
                    </Space>
                </Radio.Group>
            </Modal>
        </Flex>
    )
}