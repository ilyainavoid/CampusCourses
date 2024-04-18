import axios from "axios";

export const getCourseDetails = async (id) => {
  try {
      const headers = {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
      let response = await axios.get(`https://camp-courses.api.kreosoft.space/courses/${id}/details`, {headers});
      console.log(response);
      return response.data;
  }
  catch (error) {
      console.error('An error occurred:', error.response ? error.response.status : error.message);
      console.log(error)
      return null;
  }
}