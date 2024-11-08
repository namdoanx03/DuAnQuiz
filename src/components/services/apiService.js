import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {

    const FormData = require('form-data');
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const getAllUser = () =>{
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {

    const FormData = require('form-data');
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const deleteAUser = (userId) =>{
    return axios.delete('api/v1/participant', {data : {id: userId} })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1//login`, {email, password}) //dang www-form-urlencoded chi can truyen 1 bien obj
}
const postRegister = (email, password) => {
    return axios.post(`api/v1//register`, {email, password}) 
}
export { postCreateNewUser, getAllUser, putUpdateUser, deleteAUser, getUserWithPaginate, postLogin, postRegister }