import {Badge} from "antd";

export default function ({count}) {
    return (
        <Badge count={count} offset={[15, -3]}>
            <span>Уведомления</span>
        </Badge>
    )
}