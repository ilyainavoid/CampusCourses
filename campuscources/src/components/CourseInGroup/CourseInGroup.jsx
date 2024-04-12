import {Col, Flex, Row} from "antd";
import {Typography} from 'antd';
import styles from './courseingroup.module.css'
import React, {useState} from "react";
import {setTextLight} from "../../utils/functions/setTextLight.js";
import {setSeason} from "../../utils/functions/setSeason.js";

const {Title, Text} = Typography;

export default function CourseInGroup({group}) {

    return (
        <Flex className={styles.courseCard}>
            <Row style={{width: '100%'}}>
                <Col xs={24} sm={12} md={16} lg={18} xl={20}>
                    <Flex vertical>
                        <Title level={5}>{group.name}</Title>
                        <Text><b>Учебный год:</b> {group.startYear}</Text>
                        <Text><b>Семестр:</b> {setSeason(group.semester)}</Text>
                        <Text>Мест всего: {group.maximumStudentsCount}</Text>
                        <Text type={setTextLight(group.remainingSlotsCount, group.maximumStudentsCount)}>Мест свободно: {group.remainingSlotsCount}</Text>
                    </Flex>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{display: "flex", justifyContent: "flex-end"}}>
                    <Flex>
                        <Text>{group.status}</Text>
                    </Flex>
                </Col>
            </Row>
        </Flex>
    )
}