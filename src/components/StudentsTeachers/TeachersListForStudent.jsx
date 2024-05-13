import {Flex} from "antd";
import TeacherCard from "./TeacherCard.jsx";

export default function TeachersListForStudents({teachers}) {

    return (
        <Flex>
            <Flex style={{width: '100%'}} vertical>
                {teachers && teachers.map((teacher) =>
                    (<TeacherCard name={teacher.name} email={teacher.email} isMain={teacher.isMain}/>)
                )}
            </Flex>
        </Flex>
    )
}