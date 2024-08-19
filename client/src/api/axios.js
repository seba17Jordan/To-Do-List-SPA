import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', //le indico cual es mi backend http://127.0.0.1:4000/api
    withCredentials: true //para que establezca las cookies,
})

export default instance;