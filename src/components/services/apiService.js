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
export { postCreateNewUser, getAllUser, putUpdateUser , deleteAUser}