import axios from "axios";

export const createCourse = async (id, data) => {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        console.log(headers);
        let response = await axios.post(`https://camp-courses.api.kreosoft.space/groups/${id}`, data, {headers});
        console.log(`Ответ API: ${response}`);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(`Ответ API: ${error}`)
        return null;
    }
}