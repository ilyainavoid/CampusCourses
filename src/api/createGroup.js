import axios from "axios";

export const createGroup = async (name) => {
    try {
        console.log(name)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        let response = await axios.post("https://camp-courses.api.kreosoft.space/groups", {name},{headers});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}