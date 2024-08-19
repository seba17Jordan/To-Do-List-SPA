import axios from './axios';

export const registerRequest = (user) => axios.post(`/register`, user); //le digo que va a recibir un usuario y que lo va a pasar como segundo valor en el req body

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify');