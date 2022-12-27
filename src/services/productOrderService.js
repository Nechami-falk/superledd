import http from "./httpService";
import apiUrl  from '../config.json';



export function addProductToOrder(formData, config){
    return http.post(`${apiUrl.apiUrl}/productOrders`, formData, config);
}

export function getProductByStatus(status){
    return http.get(`${apiUrl.apiUrl}/productOrders/${status}`);
}

export function getProductOrders(){
    return http.get(`${apiUrl.apiUrl}/productOrders`);
}

export function getCustomerOrder(customerId){
    return http.get(`${apiUrl.apiUrl}/productOrders/${customerId}`);
}

export function getOrderByNumberOrder(numberOrder){
    return http.get(`${apiUrl.apiUrl}/productOrders/numberOrder/${numberOrder}`);
}

export function deleteProdFromOrder(productId){
    console.log(productId);
    return http.delete(`${apiUrl.apiUrl}/productOrders/${productId}`)
}

/* export function editProductToOrder(productId){
    console.log('333');
    return http.put(`${apiUrl.apiUrl}/productOrders/${productId}`)
} */

export function updateStatusToOrder(id, status){
    console.log('101010');
    let details = {
        productId: id,
        status:status
    }
    return http.put(`${apiUrl.apiUrl}/productOrders/status`,details);
}

const service = {
    getProductByStatus,
    getProductOrders,
    getCustomerOrder,
    addProductToOrder,
    getOrderByNumberOrder,
    deleteProdFromOrder,
   /*  editProductToOrder, */
    updateStatusToOrder
}

export default service;