import axios from 'axios';
import Cookies from 'js-cookie';


// Define the base URL for the API
const baseURL = 'http://localhost:5000';


// axios.interceptors.request.use(
//   (config) => {
//     config.withCredentials = true;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


//post request for signup
export const createAccount = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/api/user/auth/register`, data);
      alert(response.data.message);
      return response.data.data;
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error);
    }
  }

  //post request for verifyuser
export const createVerifyUser = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/user/auth/verify-signup`, data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error);
  }
}

  //post request for login
export const createlogin = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/api/user/auth/login`, data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error);
    }
  };

  export const createLogout = async () => {
    try {
      const token = Cookies.get('access_token'); // Retrieve the token from the cookie
      console.log(token)
      const response = await axios.post(
        `${baseURL}/api/user/auth/logout`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Include credentials in the request
        });
      return response.data.data;
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error);
    }
  };

  export const createProperty = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/api/property`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// GET request example
export const getProperties = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/property`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const getPropertyDetail = async (propertyId) => {
  try {
    const response = await axios.get(`${baseURL}/api/property/${propertyId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePropertyDetail = async (propertyId) => {
  try {
    const response = await axios.put(`${baseURL}/api/property/${propertyId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePropertyDetail = async (propertyId) => {
  try {
    const response = await axios.delete(`${baseURL}/api/property/${propertyId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPropertyDocument = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/property`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const getPropertyDocument = async (propertydocumentId) => {
  try {
    const response = await axios.get(`${baseURL}/api/property/${propertydocumentId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const getOfferedProperty = async (offerpropertyId) => {
  try {
    const response = await axios.get(`${baseURL}/api/property/${offerpropertyId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addOfferProperty = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/property`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const getCompletedTodo = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/api/todo/completed`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT request example
export const updateTodo = async (id, data) => {
  try {
    const response = await axios.patch(`${baseURL}/api/todo/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE request example
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/api/todo/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
