import axios from 'axios';

const url = 'http://localhost:5000/users';

export const loadUser = (config) => axios.get(`${url}/load`, config); // config => contains header with token
export const getUsers = () => axios.get(url);
export const registerUser = (newUser, config) => axios.post(`${url}/register`, newUser, config); 
export const updateUser = (id, updatedUser) => axios.patch(`${url}/${id}`, updatedUser)
export const deleteUser = (id) => axios.delete(`${url}/${id}`);









