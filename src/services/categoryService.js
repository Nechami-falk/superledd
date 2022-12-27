import http from "./httpService";
import apiUrl  from '../config.json';


export function addCategory(data){
    console.log(apiUrl);
    return http.post(`${apiUrl.apiUrl}/categories`, data);
}

export function getCategory(){
    return http.get(`${apiUrl.apiUrl}/categories`);
}

const service = {
    addCategory,
    getCategory
}

export default service;

