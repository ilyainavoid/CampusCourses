import axios from "axios";

export const editCourseAsAdmin = async (courseId, data) => {
    try {
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        let response = await axios.put(`https://camp-courses.api.kreosoft.space/courses/${courseId}`, data, {headers})
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}