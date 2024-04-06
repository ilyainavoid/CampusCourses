import {Button, Col, Flex, Input, message, Modal, Row} from "antd";
import React, {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import CoursesGroup from "../../components/CoursesGroup/CoursesGroup.jsx";
import {getGroups} from "../../api/getGroups.js";
import {createGroup} from "../../api/createGroup.js";
import {deleteGroup} from "../../api/deleteGroup.js";

export default function CoursesGroupsPage() {
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [groups, setGroups] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect( () => {
        async function fetchData() {
            let groupsList = await getGroups();
            setGroups(groupsList);
        }
        fetchData();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const notify = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const handleOk = async () => {
        let response = await createGroup(groupName);
        setLoading(true);
        if (!response) {
            notify('error', 'Произошла ошибка!');
        }
        else {
            notify('success', 'Группа успешно создана');
            setGroups(prevGroups => [...prevGroups, { id: response.id, name: groupName }]);
        }
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1000);
        setGroupName('');
    };

    const handleDeleteGroup = async (groupId) => {
        let response = await deleteGroup(groupId);
        if (response.status === 200) {
            notify('success', 'Группа успешно удалена');
            setGroups(groups.filter(group => group.id !== groupId));
        } else {
            notify('error', 'Произошла ошибка!');
        }
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1000);
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const handleGroupCreate = () => {
        showModal();
    }

    return (
        <Flex align="center" justify="center" style={{padding: '25px'}}>
            {contextHolder}
            <Flex style={{width: '80%'}} vertical>
                <Flex>
                    <h1>Группы кампусных курсов</h1>
                    {userRole === 'Admin' && <Button  type="dashed" onClick={handleGroupCreate} style={{marginLeft: '10px', marginTop: '5px'}}><PlusOutlined/> Создать</Button>}
                </Flex>
                <Flex vertical>
                    {groups.map((group) => (
                        <CoursesGroup id={group.id} name={group.name} onDelete={handleDeleteGroup}/>
                    ))}
                </Flex>
            </Flex>
            <Modal
                title="Создание группы"
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
                <label>Название группы</label>
                <Input value={groupName} onChange={e => setGroupName(e.target.value)}></Input>
            </Modal>
        </Flex>
    )
}