import {Flex, message, Typography} from "antd";
import {useEffect, useState} from "react";
import {getMyCourses} from "../../api/getMyCourses.js";
import CourseInGroup from "../../components/CourseInGroup/CourseInGroup.jsx";
const { Title } = Typography;

export default function MyCoursesPage() {
    const [myCourses, setMyCourses] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        async function fetchData() {
            let courses = await getMyCourses();
            if (!courses) {
                notify('error', 'Произошла ошибка при загрузке курсов!');
                return;
            }
            setMyCourses(courses);
        }

        fetchData();
    }, []);

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
                        Мои курсы
                    </Title>
                </Flex>
                <Flex vertical>
                    {myCourses && myCourses.map((course) => (
                        <CourseInGroup group={course}></CourseInGroup>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}