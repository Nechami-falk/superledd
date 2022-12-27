import http from "./httpService";
import apiUrl  from '../config.json';


export function addCustomer(data){
    return http.post(`${apiUrl.apiUrl}/customers`, data);
}

export function getCustomers(){
    console.log('ccc');
    return http.get(`${apiUrl.apiUrl}/customers`);
}

export function getCustomer(customerPhone){
    return http.get(`${apiUrl.apiUrl}/customers/${customerPhone}`);
}

const service = {
    addCustomer,
    getCustomers,
    getCustomer
}

export default service;