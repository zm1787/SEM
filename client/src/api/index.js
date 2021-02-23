import axios from 'axios';

const url = 'http://localhost:5000/users';

export const loadUser = (config) => axios.get(`${url}/load`, config); // config => contains header with token
export const getUsers = () => axios.get(url);
export const registerSeeker = (newUser, config) => axios.post(`${url}/register/seeker`, newUser, config); 
export const loginUser = (user, config) => axios.post(`${url}/login`, user, config); 
export const updateUser = (id, updatedUser) => axios.patch(`${url}/${id}`, updatedUser)
export const deleteUser = (id) => axios.delete(`${url}/${id}`);









