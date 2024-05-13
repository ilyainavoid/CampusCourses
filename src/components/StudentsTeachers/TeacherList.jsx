import {Button, Flex, Input, message, Modal, Select, Switch} from "antd";
import {useEffect, useRef, useState} from "react";
import TeacherCard from "./TeacherCard.jsx";
import {getUsers} from "../../api/getUsers.js";
import {useLocation} from "react-router-dom";
import {addTeacher} from "../../api/addTeacher.js";
import {getCourseDetails} from "../../api/getCourseDetails.js";

export default function TeacherList({teachers, students}) {
    const location = useLocation();
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [potentialTeachers, setPotentialTeachers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [courseTeachers, setCourseTeachers] = useState(teachers);

    const courseId = location.state.id;
    const haveRights = (userRole === 'Admin' || userRole === 'Teacher');

    useEffect(() => {
        async function fetchData() {
            const users = await getUsers();
            const enrolledStudents = students.filter(student => student.status === 'Accepted');
            const usersNotInStudents = users.filter(user => !enrolledStudents.some(student => student.id === user.id));
            const potentialTeachersUsers = usersNotInStudents.filter(user => !teachers.some(teacher => teacher.id === user.id));
            setPotentialTeachers(potentialTeachersUsers);
        }

        fetchData();
    }, []);

    const selectOptions = (haveRights) ? potentialTeachers.map(item => ({
        value: item.id,
        label: item.fullName
    })) : [];

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const notify = (type, message) =>{
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const handleOk = async () => {
        let response = await addTeacher(courseId, selectedTeacher);
        setIsLoading(true);
        if (response) {
            notify('success', 'Преподаватель успешно добавлен');
            let response = await getCourseDetails(courseId);
            if (response) {
                console.log(response.teachers);
                setCourseTeachers(response.teachers)
            }
            else {
                notify('error', 'Не удалось обновить список преподавателей');
            }
        }
        else {
            notify('error', 'Произошла ошибка при добавлении преподавателя');
        }
        setTimeout(() => {
            setIsOpen(false);
            setIsLoading(false);
            setSelectedTeacher(null);
        }, 2000);
    }

    const handleCancel = () => {
        setIsOpen(false);
    }

    const handleChange = (value, label) => {
        setSelectedTeacher(value);
    };

    return (
        <Flex>
            {contextHolder}
            <Flex style={{width: '100%'}} vertical>
                {haveRights && <Button style={{marginBottom: '20px'}} onClick={() => {setIsOpen(true)}}>Добавить преподавателя</Button>}
                {courseTeachers && courseTeachers.map((teacher) =>
                    (<TeacherCard name={teacher.name} email={teacher.email} isMain={teacher.isMain}/>)
                )}
            </Flex>
            <Modal
                title="Добавить преподавателя"
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
                <Select style={{width:'100%'}}
                        options={selectOptions}
                        showSearch
                        placeholder="Выберите преподавателя"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        onChange={handleChange}
                        value={selectedTeacher}
                >

                </Select>
            </Modal>
        </Flex>
    )
}