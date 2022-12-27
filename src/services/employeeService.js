import http from "./httpService";
import apiUrl  from '../config.json';


export function addEmployee(data){
    console.log(apiUrl);
    console.log(data);
    return http.post(`${apiUrl.apiUrl}/employees`, data);
}

export function getEmployees(){
    console.log('ccc');
    return http.get(`${apiUrl.apiUrl}/employees`);
}

const service = {
    addEmployee,
    getEmployees
}

export default service;

