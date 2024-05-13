import axios from "axios";

export const deleteGroup = async (id) => {
    try {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        console.log(headers)
        let response = await axios.delete(`https://camp-courses.api.kreosoft.space/groups/${id}`, {headers});
        console.log(response);
        return response;
    }
    catch (error) {
        console.error('An error occurred:', error.response ? error.response.status : error.message);
        console.log(error)
        return null;
    }
}