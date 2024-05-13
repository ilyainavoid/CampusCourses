import axios from "axios";

export const editStudentStatus = async (courseId, studentId, status) => {
    try {
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        let response = await axios.post(`https://camp-courses.api.kreosoft.space/courses/${courseId}/student-status/${studentId}`, {status}, {headers});
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}