import {Flex, Typography} from "antd";
const { Text } = Typography;
import styles from './arn.module.css'
export default function Notification({notification}) {

    return (
        <Flex className={`${styles.notification} ${notification.isImportant ? styles.isImportant : ''}`}>
            <Text>{notification.text}</Text>
        </Flex>
    )
}