import http from "./httpService";
import apiUrl  from '../config.json';

export class EmployeeService{
    static addEmployee(data){
        console.log(apiUrl);
        console.log(data);
        return http.post(`${apiUrl.apiUrl}/employees`, data);
    }

    static getEmployees(){
        console.log('ccc');
        return http.get(`${apiUrl.apiUrl}/employees`);
    }

}



