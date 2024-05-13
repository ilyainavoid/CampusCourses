import {Flex} from "antd";
import parse from 'html-react-parser'
export default function Tab({layout}) {
    return(
        <Flex style={{padding: '25px'}} vertical>
            {parse(layout)}
        </Flex>
    )
}