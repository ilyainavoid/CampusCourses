import {useEffect, useState} from "react";
import {Flex, message, Typography} from "antd";
import CourseInGroup from "../../components/CourseInGroup/CourseInGroup.jsx";
import {getTeachingCourses} from "../../api/getTeachingCourses.js";
const { Title } = Typography;


export default function TeachingCoursesPage() {
    const [teachingCourses, setTeachingCourses] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        async function fetchData() {
            let courses = await getTeachingCourses();
            if (!courses) {
                notify('error', 'Произошла ошибка при загрузке курсов!');
                return;
            }
            setTeachingCourses(courses);
        }

        fetchData();
    }, []);

    console.log(teachingCourses)

    const notify = (type, message) =>{
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
                    <Title>
                        Преподаваемые курсы
                    </Title>
                </Flex>
                <Flex vertical>
                    {teachingCourses && teachingCourses.map((course) => (
                        <CourseInGroup group={course}></CourseInGroup>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}