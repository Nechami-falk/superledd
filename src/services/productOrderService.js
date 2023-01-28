import http from "./httpService";
import apiUrl  from '../config.json';

export class ProductOrderService{

    static addProductToOrder(formData, config){
        return http.post(`${apiUrl.apiUrl}/productOrders`, formData, config);
    }

    static getProductByStatus(status){
        console.log(status);
        return http.get(`${apiUrl.apiUrl}/productOrders/${status}`);
    }

    static getProductById(productId){
        return http.get(`${apiUrl.apiUrl}/productOrders/productId/${productId}`);
    }

    static getCustomerOrder(customerId){
        return http.get(`${apiUrl.apiUrl}/productOrders/${customerId}`);
    }

    static getProductOrders(){
        return http.get(`${apiUrl.apiUrl}/productOrders`);
    }

    static getOrderByNumberOrder(numberOrder){
        console.log('number', numberOrder);
        return http.get(`${apiUrl.apiUrl}/productOrders/numberOrder/${numberOrder}`);
    }

    static getProductStatusBySearch(data, status){
        return http.get(`${apiUrl.apiUrl}/productOrders/search/${status}?data=${data}`);
    }

    static deleteProdFromOrder(productId){
        console.log(productId);
        return http.delete(`${apiUrl.apiUrl}/productOrders/${productId}`)
    }

    
    static deleteProductsOrder(numberOrder){
        return http.delete(`${apiUrl.apiUrl}/productOrders/?numberOrder=${numberOrder}`)
    }

    static updateProductById(id,data){
        console.log('data', data);
        return http.put(`${apiUrl.apiUrl}/productOrders/${id}`, data);
    }

    static updateStatusToProduct(id, status, date){
        console.log('101010');
        return http.put(`${apiUrl.apiUrl}/productOrders?id=${id}&status=${status}&date=${date}`);
    }

   
}
