import axios from "axios";

export const editStatus = async (courseId, status) => {
    try {
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        let response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/status`, {status}, {headers});
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        if (error.response.data.message === "Course status cannot be changed to a previous one.") {
            return error.response.data;
        }
        else {
            return null;
        }
    }
}