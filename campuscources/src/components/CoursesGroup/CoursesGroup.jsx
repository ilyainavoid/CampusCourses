import {Button, Col, Flex, Input, message, Modal, Row} from "antd";
import styles from './coursesgroup.module.css'
import React, {useEffect, useState} from "react";
import {createGroup} from "../../api/createGroup.js";
import {editGroup} from "../../api/editGroup.js";
import {deleteGroup} from "../../api/deleteGroup.js";
import {useNavigate} from "react-router-dom";

export default function CoursesGroup({ id, name, onDelete }) {
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [groupName, setGroupName] = useState('');
    const [groupNameInput,  setGroupNameInput] = useState('')
    const [isOpen, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setGroupName(name);
        setGroupNameInput(name);
    }, [name]);
    const showModal = () => {
        setOpen(true);
    };

    const notify = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = async () => {
        let response = editGroup(id, groupNameInput);
        setLoading(true);
        if (!response) {
            notify('error', 'Произошла ошибка!');
        }
        else {
            notify('success', 'Группа успешно отредактирована');
            setGroupName(groupNameInput);
        }
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1000);
    };

    const handleDelete = async () => {
        await onDelete(id);
    }

    const handleGroupUpdate = () => {
        showModal();
    }

    const handleGroupClick = () => {
        navigate(`/groups/${id}`, { state: { id: id }});
    };

    return (
        <Flex className={styles.groupCard} onClick={handleGroupClick}>
            {contextHolder}
            <Row style={{width: '100%'}}>
                <Col xs={24} sm={12} md={16} lg={18} xl={20}>
                    <Flex align="center">
                        <p className={styles.groupName}>{groupName}</p>
                    </Flex>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    {userRole === "Admin" &&
                        <Flex vertical>
                            <Button type="dashed" onClick={handleGroupUpdate}>Редактировать</Button>
                            <Button type="dashed" onClick={handleDelete}>Удалить</Button>
                        </Flex>
                    }
                </Col>
            </Row>
            <Modal
                title="Редактирование группы"
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
                <label>Название группы</label>
                <Input value={groupNameInput} onChange={e => setGroupNameInput(e.target.value)}></Input>
            </Modal>
        </Flex>
    )
}