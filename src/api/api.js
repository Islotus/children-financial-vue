import axios from 'axios';

let base = 'http://192.168.253.3:8080/';
// let base = 'http://localhost:10002/';

//登录
export const requestLogin = params => { return axios.post(base + `login`, params).then(res => res.data); };
//查询理财产品
export const qryproducts = params => { return axios.post(base + `finProd/getProductInfo`, params).then(res => res.data); };
//注册
export const register = params => { return axios.post(base + `register`, params).then(res => res.data); };
//查询卡号
export const qryCardList = params => { return axios.post(base + `finOps/getCardsByAccount`, params).then(res => res.data); };
//购买理财产品
export const buyProduct = params => { return axios.post(base + `finProd/purchaseProduct`, params).then(res => res.data); };
//转账
export const transferMoney = params => { return axios.post(base + `finOps/transProcess`, params).then(res => res.data); };
//查询理财和定投金额
export const qryLicaiAndDingTou = params => { return axios.post(base + `finProd/querySumPropertyByAccount`, params).then(res => res.data); };
//查询账户卡余额
export const qryYuEr = params => { return axios.post(base + `userMng/queryRemainAmt`, params).then(res => res.data); };
//查询账户余额流水
export const qryYuErList = params => { return axios.post(base + `userMng/queryLsInf`, params).then(res => res.data); };
