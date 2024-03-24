import axios from 'axios'

export const register = async (data) => {
    try {
        const response = await axios.post(`https://camp-courses.api.kreosoft.space/registration`, data);
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response.data.token;
    } catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}