import axios from "axios";

export const editGroup = async (id, name) => {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        let response = await axios.put(`https://camp-courses.api.kreosoft.space/groups/${id}`, {name},{headers});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}