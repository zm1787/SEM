import axios from 'axios';

const url = 'http://localhost:5000/users';

export const loadUser = (config) => axios.get(`${url}/load`, config); // config => contains header with token
export const getUsers = () => axios.get(url);
export const fetchUsers = () => axios.get(url);
export const createUser = (newUser) => axios.post(url, newUser); 
export const updateUser = (id, updatedUser) => axios.patch(`${url}/${id}`, updatedUser)
export const deleteUser = (id) => axios.delete(`${url}/${id}`);









