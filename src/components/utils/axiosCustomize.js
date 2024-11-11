import axios from "axios";
import NProgress from "nprogress";
import { store } from "../../redux/store";

NProgress.configure({ 
    showSpinner: false ,
    trickleSpeed: 100
});


const instance = axios.create({
    baseURL: 'http://localhost:8081/',//duong link backend muon goi toi
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const access_token = store?.getState()?.user?.account?.access_token; //lay access_token tu redux
    config.headers["Authorization"] = "Bearer " + access_token; //xác thực yêu cầu đến server bằng cách gửi access_token
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance