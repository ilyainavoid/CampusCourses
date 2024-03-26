import axios from "axios";

export const authorize = async (values) => {
    try {
        let response = await axios.post('https://camp-courses.api.kreosoft.space/login', values);
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        return response.data.token;
    }
    catch (error)  {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}