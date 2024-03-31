import axios from "axios";

export const editProfile = async (token, values) => {
    try {
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = await axios.put(`https://camp-courses.api.kreosoft.space/profile`, values, {headers});
        console.log(response);
        return response.data;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}