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
    return axios.post(`api/v1//login`, {email, password, delay: 5000}) //dang www-form-urlencoded chi can truyen 1 bien obj
}
const postRegister = (email, password) => {
    return axios.post(`api/v1//register`, {email, password}) 
}
const getQuizByUser = () => { //su dung access_token de lay bai thi nen khong can truyen vao tham so
    return axios.get(`api/v1/quiz-by-participant`)
}
const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}
const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, {...data}) // ...data : copy data 
}
const postCreateNewQuiz = (description, name, difficulty, image ) =>{
    const FormData = require('form-data');
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)
}
const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`)
}
const deleteQuizForAdmin = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}
const updateQuizForAdmin = (id, description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}
const postCreateNewQuestionForQuiz = (quiz_id, description, image ) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}
export { postCreateNewUser, getAllUser, putUpdateUser, deleteAUser, getUserWithPaginate, 
    postLogin, postRegister, getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz, 
    getAllQuizForAdmin, deleteQuizForAdmin, updateQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion }