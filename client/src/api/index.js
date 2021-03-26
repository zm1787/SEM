import axios from 'axios';

const userUrl = 'http://localhost:5000/users';
const businessUrl = 'http://localhost:5000/business';

export const getUsers = () => axios.get(userUrl); // For testing purposes only.

// Seeker / regular user
export const loadUser = (config) => axios.get(`${userUrl}/load`, config); // config => contains header with token
export const loadUserProfile = (config) => axios.get(`${userUrl}/loadprofile`, config); // config => contains header with token
export const registerSeeker = (newUser, config) => axios.post(`${userUrl}/register/seeker`, newUser, config); 
export const loginUser = (user, config) => axios.post(`${userUrl}/login`, user, config); 
export const updateUser = (id, updatedUser) => axios.patch(`${userUrl}/${id}`, updatedUser)
export const deleteUser = (id) => axios.delete(`${userUrl}/${id}`);

// Business
export const registerBusiness = (newBusiness, config) => axios.post(`${businessUrl}/register`, newBusiness, config); 










