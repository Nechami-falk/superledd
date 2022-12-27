import http from "./httpService";
import apiUrl  from '../config.json';


export function addCompany(data){
    console.log(apiUrl);
    return http.post(`${apiUrl.apiUrl}/companies`, data);
}

export function getCompany(){
    return http.get(`${apiUrl.apiUrl}/companies`);
}

const service = {
    addCompany,
    getCompany
}

export default service;

