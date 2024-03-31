import axios from "axios";

export const getProfile = async (token) => {
    try {
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        console.log(token);
        let response = await axios.get('https://camp-courses.api.kreosoft.space/profile', {headers});
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}
