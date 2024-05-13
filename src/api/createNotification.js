import {notification} from "antd";
import axios from "axios";

export const createNotification = async (id, {text, isImportant}) => {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        let response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${id}/notifications`, {text, isImportant}, {headers});
        console.log(response);
        return response.data
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}