import axios from "axios";
import Cookies from "js-cookie";

// Define the base URL for the API
const baseURL = "https://realestate-backend-85sd.onrender.com";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Include credentials in the request
});

//post request for signup
export const createAccount = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/user/auth/register`,
      data
    );
    alert(response.data.message);
    return response.data.data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error);
  }
};

//post request for verifyuser
export const createVerifyUser = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/user/auth/verify-signup`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error);
  }
};

//post request for login
export const createlogin = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/user/auth/login`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error);
  }
};

export const createLogout = async () => {
  try {
    const token = Cookies.get("access_token"); // Retrieve the token from the cookie
    console.log(token);
    const response = await axiosInstance.post(
      `${baseURL}/api/user/auth/logout`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include credentials in the request
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error);
  }
};

// GET request example
export const getUsers = async (query) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/api/user`, {
      params: query,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProperty = async (data) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/api/property`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const getProperties = async (query) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/api/property`, {
      params: query,
    });
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
    const response = await axiosInstance.get(
      `${baseURL}/api/property/${propertyId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePropertyDetail = async (propertyId) => {
  try {
    const response = await axiosInstance.put(
      `${baseURL}/api/property/${propertyId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePropertyDetail = async (propertyId) => {
  try {
    const response = await axiosInstance.delete(
      `${baseURL}/api/property/${propertyId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPropertyDocument = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/propertydocument`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const getPropertyDocument = async (documentId) => {
  try {
    if (!documentId) {
      throw new Error("Invalid propertyId");
    }
    const response = await axiosInstance.get(
      `${baseURL}/api/propertydocument/${documentId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const getOfferedProperty = async (offerpropertyId) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/api/offerproperty/${offerpropertyId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addOfferProperty = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/offerproperty`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fixMeetingWithSeller = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/api/offerproperty/fixmeeting`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const fetchChats = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/api/chats`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createChat = async (data) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/api/chats/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserChats = async (userId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/api/chats/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMessage = async (chatId) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/api/message/${chatId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendMessageToServer = async (data) => {
  try {
    const response = await axiosInstance.post(`${baseURL}/api/message/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT request example
export const updateTodo = async (id, data) => {
  try {
    const response = await axiosInstance.patch(
      `${baseURL}/api/todo/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET request example
export const findChat = async (firstId, secondId) => {
  try {
    const response = await axiosInstance.get(
      `${baseURL}/api/chats/${firstId}/${secondId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default axiosInstance;
