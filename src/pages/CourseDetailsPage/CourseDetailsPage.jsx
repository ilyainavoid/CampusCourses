import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getCourseDetails} from "../../api/getCourseDetails.js";
import {Button, Flex, message, Modal, Typography} from "antd";
import CourseMainDetails from "../../components/CourseMainDetails/CourseMainDetails.jsx";
import {EditOutlined} from "@ant-design/icons";
import styles from './coursedetails.module.css'
import AnnotationsRequirementsNotifications
    from "../../components/AnnotationsRequirementsNotifications/AnnotationsRequirementsNotifications.jsx";
import StudentTeachers from "../../components/StudentsTeachers/StudentTeachers.jsx";
import {getRole} from "../../api/getRole.js";
import EditCourseAsAdmin from "../../components/CourseEditingModals/EditCourseAsAdmin.jsx";
import EditCourseAsTeacher from "../../components/CourseEditingModals/EditCourseAsTeacher.jsx";
const { Title } = Typography;

export default function CourseDetailsPage() {
    const location = useLocation();
    const [courseDetails, setCourseDetails] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [userRole, setUserRole] = useState(localStorage.getItem('role').toString());
    const [open, setOpen] = useState(false);

    let courseId = location.state.id;
    const hasRights = (userRole === 'Admin' || userRole === 'Teacher')
    console.log(hasRights)

    useEffect(() => {
        async function fetchData() {
            let details = await getCourseDetails(courseId);
            if (!details) {
                console.log('Ничего не пришло')
                return;
            }
            setCourseDetails(details);
        }

        fetchData();
    }, []);

    const notify = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }


    return (
        <Flex align="center" justify="center" style={{padding: '25px'}}>
            {contextHolder}
            <Flex style={{width: '60%'}} vertical>
                <Flex>
                    <Title>{courseDetails && courseDetails.name}</Title>
                </Flex>
                <Flex style={{borderBottom: '1px solid #000'}}>
                    <Title level={3}>Основные данные курса</Title>
                    {hasRights && <Button style={{marginLeft: '10px'}} onClick={() => setOpen(true)}>Изменить</Button>}
                </Flex>
                <Flex className={styles.detailSection}>
                    {courseDetails && <CourseMainDetails courseDetails={courseDetails} notify={notify}/>}
                </Flex>
                <Flex className={styles.detailSection}>
                    {courseDetails && <AnnotationsRequirementsNotifications courseDetails={courseDetails}/>}
                </Flex>
                <Flex className={styles.detailSection}>
                    {courseDetails && <StudentTeachers courseDetails={courseDetails}/>}
                </Flex>
            </Flex>
            {userRole === 'Admin' && <EditCourseAsAdmin isOpen={open} setOpen={setOpen} setDetails={setCourseDetails} courseDetails={courseDetails} notify={notify}/>}
            {userRole === 'Teacher' && <EditCourseAsTeacher isOpen={open} setOpen={setOpen} setDetails={setCourseDetails} courseDetails={courseDetails} notify={notify}/>}
        </Flex>
    )
}