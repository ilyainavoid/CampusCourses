import {useEffect, useState} from "react";
import {Button, Flex, Modal, Select} from "antd";
import StudentCard from "./StudentCard.jsx";

export default function StudentsListForStudent({students}) {
    const [courseStudents, setCourseStudents] = useState(students);
    const enrolledStudents = courseStudents.filter(student => student.status === 'Accepted');

    console.log(students, 'студенты')

    return (
        <Flex>
            <Flex style={{width: '100%'}} vertical>
                {enrolledStudents && enrolledStudents.map((student) => (
                    <StudentCard
                        name={student.name}
                        email={student.email}
                        status={student.status}
                        midtermResult={student.midtermResult}
                        finalResult={student.finalResult}
                    />
                ))}
            </Flex>
        </Flex>
    )
}