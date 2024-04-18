import {useState} from "react";
import {Flex} from "antd";
import StudentCard from "./StudentCard.jsx";

export default function StudentsList({students}) {
    const [courseStudents, setCourseStudents] = useState(students);
    console.log(students, 'студенты')

    return (
        <Flex>
            <Flex style={{width: '100%'}} vertical>
                {students && students.map((student) => (
                    <StudentCard
                        name={student.name}
                        email={student.email}
                        status={student.status}
                        midtermResult={student.midtermResult}
                        finalResult={student.finalResult}
                        id={student.id}
                    />
                ))}
            </Flex>
        </Flex>
    )
}