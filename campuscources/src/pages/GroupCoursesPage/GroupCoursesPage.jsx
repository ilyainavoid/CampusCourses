import {useLocation, useParams} from "react-router-dom";
import {Button, Flex, Input, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup.jsx";
import React, {useEffect, useState} from "react";
import {getGroups} from "../../api/getGroups.js";
import CourseInGroup from "../../components/CourseInGroup/CourseInGroup.jsx";
import { Typography } from 'antd';
import {getCourses} from "../../api/getCourses.js";

const { Title } = Typography;

export default function GroupCoursesPage() {
    const location = useLocation();
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [groupName, setGroupName] = useState('');
    const [courses, setCourses] = useState([]);

    let groupId = location.state.id;

    useEffect(() => {
        async function fetchData(){
            let groups = await getGroups();
            let item = groups.find(item => item.id === groupId)
            setGroupName(item.name);
            let groupCourses = await getCourses(groupId);
            setCourses(groupCourses);
        }
        fetchData();
    }, []);

    const handleGroupCreate = () => {
      return null;
    }

    return (
        <Flex align="center" justify="center" style={{padding: '25px'}}>
            <Flex style={{width: '60%'}} vertical>
                <Flex>
                    <Title>{groupName}</Title>
                    {userRole === 'Admin' && <Button  type="dashed" onClick={handleGroupCreate} style={{marginLeft: '10px', marginTop: '10px'}}><PlusOutlined/> Создать курс</Button>}
                </Flex>
                <Flex vertical>
                    {courses && courses.map((group) => (
                        <CourseInGroup group={group}></CourseInGroup>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}