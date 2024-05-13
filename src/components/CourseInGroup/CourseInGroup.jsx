import {Col, Flex, Row} from "antd";
import {Typography} from 'antd';
import styles from './courseingroup.module.css'
import React, {useState} from "react";
import {setTextLight} from "../../utils/functions/setTextLight.js";
import {translateSemester} from "../../utils/functions/translateSemester.js";
import {translateStatus} from "../../utils/functions/translateStatus.js";
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

export default function CourseInGroup({group}) {
    const [groupName, setGroupName] = useState(group.name);
    const [year, setYear] = useState(group.startYear);
    const [semester, setSemester] = useState(group.semester);
    const [slotsTotal, setSlotsTotal] = useState(group.maximumStudentsCount);
    const [slotsLeft, setSlotsLeft] = useState(group.remainingSlotsCount);
    const [status, setStatus] = useState(group.status);
    const [id, setId] = useState(group.id)
    const navigate = useNavigate();

    const handleGroupClick = () => {
        navigate(`/courses/${id}`, { state: { id: id }});
    };

    return (
        <Flex className={styles.courseCard} onClick={handleGroupClick}>
            <Row style={{width: '100%'}}>
                <Col xs={24} sm={12} md={16} lg={18} xl={20}>
                    <Flex vertical>
                        <Title level={5}>{groupName}</Title>
                        <Text><b>Учебный год:</b> {year}</Text>
                        <Text><b>Семестр:</b> {translateSemester(semester)}</Text>
                        <Text>Мест всего: {slotsTotal}</Text>
                        <Text type={setTextLight(slotsLeft, slotsTotal)}>Мест свободно: {slotsLeft}</Text>
                    </Flex>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{display: "flex", justifyContent: "flex-end"}}>
                    <Flex>
                        <Text>{translateStatus(status)}</Text>
                    </Flex>
                </Col>
            </Row>
        </Flex>
    )
}