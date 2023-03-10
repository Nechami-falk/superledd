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

    static searchCustomer(data){
        console.log(data);
        return http.get(`${apiUrl.apiUrl}/customers/search/${data}`);
    }

    static editCustomer(id, data){
        return http.put(`${apiUrl.apiUrl}/customers/${id}`, data);
    }

    static deleteCustomer(id){
        console.log('deleteeeeee');
        console.log(id);
        return http.delete(`${apiUrl.apiUrl}/customers/${id}`);
    }

    
}
