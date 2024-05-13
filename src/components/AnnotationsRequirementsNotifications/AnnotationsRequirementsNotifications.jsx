import {Flex, Tabs} from "antd";
import Tab from "./Tab.jsx";
import NotificationsTabLabel from "./NotificationsTabLabel.jsx";
import NotificationsList from "./NotificationsList.jsx";

export default function AnnotationsRequirementsNotifications({courseDetails}) {

    console.log(courseDetails)

    const items = [
        {
            key: '1',
            label: 'Требования к курсу',
            children: <Tab layout={courseDetails.requirements}/>
        },
        {
            key: '2',
            label: 'Аннотация',
            children:  <Tab layout={courseDetails.annotations}/>
        },
        {
            key: '3',
            label: <NotificationsTabLabel count={courseDetails.notifications.length}/>,
            children: <NotificationsList notifications={courseDetails.notifications}/>
        },
    ];

    return(
        <Flex style={{width: '100%'}}>
            <Tabs style={{width: '100%'}} defaultActiveKey="1" items={items} centered/>
        </Flex>
    )
}