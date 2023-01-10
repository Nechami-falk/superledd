import http from "./httpService";
import apiUrl  from '../config.json';


export class OrderService{

    static addOrder(data){
        console.log(apiUrl);
        return http.post(`${apiUrl.apiUrl}/orders`, data);
    }

    static getOrders(){
        console.log('ccc');
        return http.get(`${apiUrl.apiUrl}/orders`);
    }

    static getBigNumberOrder(){
        console.log('service');
        return http.get(`${apiUrl.apiUrl}/orders/bigNumberOrder`);
    }

    static getQuotePriceOrders(){
        console.log('getQuotePriceOrders');
        return http.get(`${apiUrl.apiUrl}/orders/quotePrice`)
    }
    static deleteOrder(id){
        console.log('id', id);
        return http.delete(`${apiUrl.apiUrl}/orders/${id}`)
    }
}


