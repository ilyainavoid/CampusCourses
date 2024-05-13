import axios from "axios";

export const getUsers = async () => {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        let response = await  axios.get('https://camp-courses.api.kreosoft.space/users', {headers});
        console.log(`Ответ API: ${response}`);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(`Ответ API: ${error}`)
        return null;
    }
}