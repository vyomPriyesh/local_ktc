const baseURL = import.meta.env.VITE_APP_BASEURL;

const API = {
    AUTH: {
      sendOtp: `${baseURL}/send_otp`,
      login: `${baseURL}/login`,
    },
    // USERS: {
    //   GET_ALL: `${baseURL}/users`,
    //   GET_BY_ID: (id) => `${baseURL}/users/${id}`,
    //   UPDATE: (id) => `${baseURL}/users/${id}`,
    // },
    // POSTS: {
    //   GET_ALL: `${baseURL}/posts`,
    //   CREATE: `${baseURL}/posts`,
    //   DELETE: (id) => `${baseURL}/posts/${id}`,
    // },
    // Add more grouped endpoints as needed
  };
  
  export default API;