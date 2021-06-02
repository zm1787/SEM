import axios from 'axios';

const contactUrl = 'http://localhost:5000/contact';
// Base Routes
const userUrl = 'http://localhost:5000/user';
const businessUrl = 'http://localhost:5000/business';
const chatUrl = 'http://localhost:5000/chat';

export const getUsers = () => axios.get(userUrl); // For testing purposes only.

// User
export const loadUser           = (config)            => axios.get(`${userUrl}/load`, config); // config => contains header with token
export const loadUserProfile    = (config)            => axios.get(`${userUrl}/loadprofile`, config); // config => contains header with token
export const registerUser       = (newUser, config)   => axios.post(`${userUrl}/register/seeker`, newUser, config); 
export const loginUser          = (user, config)      => axios.post(`${userUrl}/login`, user, config); 
export const updateUser         = (id, updatedUser)   => axios.patch(`${userUrl}/${id}`, updatedUser)
export const deleteUser         = (id)                => axios.delete(`${userUrl}/${id}`);

// Business
export const registerBusiness = (newBusiness, config) => axios.post(`${businessUrl}/register`, newBusiness, config); 
export const fetchMyBusinesses = (config) => axios.get(`${businessUrl}/myBusinesses`, config); 
export const getNearbyBusinesses = (config) => axios.get(`${businessUrl}/getNearbyBusinesses`, config); 
export const fetchBusinessDetails = (businessID, config) => axios.get(`${businessUrl}/fetchBusinessDetails/${businessID}`, config); 

// CONTACT
export const sendContactRequest = (newRequest, config) => axios.post(`${contactUrl}/sendContactRequest`, newRequest, config); 