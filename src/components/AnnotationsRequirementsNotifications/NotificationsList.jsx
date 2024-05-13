import Notification from "./Notification.jsx";
import {Button, Flex, Input, message, Modal, Switch, Typography} from "antd";
import {useState} from "react";
import {createNotification} from "../../api/createNotification.js";
import {useLocation} from "react-router-dom";

export default function NotificationsList({notifications}) {
    const { Title } = Typography;
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [courseNotifications, setCourseNotifications] = useState(notifications);
    const location = useLocation();

    const haveRights = (userRole === 'Admin' || userRole === 'Teacher');
    let courseId = location.state.id;

    const handleOk = async () => {
        const notification = {
            text: value,
            isImportant: isImportant
        }
        setIsLoading(true);
        console.log(notification);
        let response = await createNotification(courseId, notification);
        if (response) {
            notify('success', 'Уведомление успешно создано');
            setCourseNotifications(prevNotifications => [...prevNotifications, notification])
        }
        else {
            notify('error', 'Произошла ошибка при создании уведомления');
        }
        setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
            setValue('');
            setIsImportant(false);
        }, 1000);
    }

    const handleCancel = () => {
        setIsOpen(false);
        setValue('');
        setIsImportant(false);
    }

    const notify = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    return (
        <Flex>
            {contextHolder}
            <Flex vertical style={{width: '100%'}}>
                {haveRights && <Button style={{marginBottom: '20px'}} onClick={() => {setIsOpen(true)}}>Создать уведомление</Button>}
                {courseNotifications && courseNotifications.map((notification) => (
                    (<Notification notification={notification}/>)
                ))}
            </Flex>
            <Modal
                title="Создание уведомлеия"
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
                <Input size="large" value={value} onChange={(e) => setValue(e.target.value)} style={{marginBottom: '10px'}}></Input>
                <Flex>
                    <Title style={{marginRight: '10px'}} level={5}>Важное уведомление:</Title>
                    <Switch onChange={(checked) => (checked ? setIsImportant(true) : setIsImportant(false))}></Switch>
                </Flex>
            </Modal>
        </Flex>
    )
}