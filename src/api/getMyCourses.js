import axios from "axios";

export const getMyCourses = async () => {
  try {
      const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      let response = await axios.get(`https://camp-courses.api.kreosoft.space/courses/my`, {headers});
      console.log(response);
      return response.data;
  }
  catch (error) {
      console.error('An error occurred:', error.response ? error.response.status : error.message);
      console.log(error)
      return null;
  }
}