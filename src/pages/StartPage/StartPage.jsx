import {Flex} from "antd";
import {useEffect} from "react";
import {getRole} from "../../api/getRole.js";

export default function StartPage() {

    return (
        <Flex style={{alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
            <p style={{fontSize: '40px'}}>Добро пожаловать в систему кампусных курсов</p>
        </Flex>
    )
}