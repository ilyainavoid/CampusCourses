import axios from "axios";

export const getRole = async (token) => {
    try {
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`https://camp-courses.api.kreosoft.space/roles`, {headers});
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}