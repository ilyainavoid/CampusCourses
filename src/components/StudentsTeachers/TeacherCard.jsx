import {Badge, Flex, Typography} from "antd";
import styles from "./studentsteachers.module.css";
const { Title , Text} = Typography;
export default function TeacherCard({email, name, isMain}) {

    return (
        <>
            <Badge.Ribbon text="Основной" color="red" style={{ display: isMain ? 'inline-block' : 'none' }}>
                <Flex className={styles.card} vertical>
                    <Title level={5}>{name}</Title>
                    <Text>{email}</Text>
                </Flex>
            </Badge.Ribbon>
        </>
    )
}