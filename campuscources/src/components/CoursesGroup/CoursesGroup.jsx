import {Button, Col, Flex, Row} from "antd";
import styles from './coursesgroup.module.css'
import {useState} from "react";

export default function CoursesGroup({groupName}) {
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));

    return (
        <Flex className={styles.groupCard}>
            <Row style={{width: '100%'}}>
                <Col xs={24} sm={12} md={16} lg={18} xl={20}>
                    <Flex align="center">
                        <p className={styles.groupName}>{groupName}</p>
                    </Flex>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    {userRole === "Admin" &&
                        <Flex vertical>
                            <Button type="dashed">Редактировать</Button>
                            <Button type="dashed">Удалить</Button>
                        </Flex>
                    }
                </Col>
            </Row>
        </Flex>
    )
}