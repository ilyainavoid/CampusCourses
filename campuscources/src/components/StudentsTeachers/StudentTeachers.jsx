import {Flex, Tabs} from "antd";
import TeacherList from "./TeacherList.jsx";
import StudentsList from "./StudentsList.jsx";
import StudentsListForStudent from "./StudentsListForStudent.jsx";
import TeachersListForStudents from "./TeachersListForStudent.jsx";

export default function StudentTeachers({courseDetails}) {
    const userRole = localStorage.getItem('role')
    const hasRights = (userRole === 'Admin' || userRole === 'Teacher')

    console.log(courseDetails.students)

    const items = [
        {
            key: '1',
            label: 'Преподаватели',
            children: (hasRights) ? <TeacherList teachers={courseDetails.teachers} students={courseDetails.students}/> : <TeachersListForStudents teachers={courseDetails.teachers}/>
        },
        {
            key: '2',
            label: 'Студенты',
            children: (hasRights) ? <StudentsList students={courseDetails.students}/> : <StudentsListForStudent students={courseDetails.students}/>
        }
    ];

    return(
        <Flex style={{width: '100%'}}>
            <Tabs style={{width: '100%'}} defaultActiveKey="1" items={items} centered/>
        </Flex>
    )
}