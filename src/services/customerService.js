import http from "./httpService";
import apiUrl  from '../config.json';


export class CustomerService{

    static addCustomer(data){
        return http.post(`${apiUrl.apiUrl}/customers`, data);
}

    static getCustomers(){
        console.log('ccc');
        return http.get(`${apiUrl.apiUrl}/customers`);
}

    static getCustomer(customerPhone){
        return http.get(`${apiUrl.apiUrl}/customers/${customerPhone}`);
    }
}
