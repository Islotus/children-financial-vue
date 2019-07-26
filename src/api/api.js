import axios from 'axios';

let base = 'http://192.168.253.2:10002/';

export const requestLogin = params => { return axios.post(base + `login`, params).then(res => res.data); };

export const qryproducts = params => { return axios.post(base + `product`, params).then(res => res.data); };

export const register = params => { return axios.post(base + `register`, params).then(res => res.data); };

