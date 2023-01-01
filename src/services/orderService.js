import http from "./httpService";
import apiUrl  from '../config.json';


export function addOrder(data){
    console.log(apiUrl);
    return http.post(`${apiUrl.apiUrl}/orders`, data);
}

export function getOrders(){
    console.log('ccc');
    return http.get(`${apiUrl.apiUrl}/orders`);
}

export function getBigNumberOrder(){
    console.log('service');
    return http.get(`${apiUrl.apiUrl}/orders/bigNumberOrder`);
}

export function getQuotePriceOrders(){
    console.log('getQuotePriceOrders');
    return http.get(`${apiUrl.apiUrl}/orders/quotePrice`)
}

export function deleteOrder(id){
    console.log('id', id);
    return http.delete(`${apiUrl.apiUrl}/orders/${id}`)
}
const service = {
    addOrder,
    getOrders,
    getBigNumberOrder,
    getQuotePriceOrders,
    deleteOrder
}

export default service;

