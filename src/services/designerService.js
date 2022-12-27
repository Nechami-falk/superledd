import http from "./httpService";
import apiUrl  from '../config.json';


export function addDesigner(data){
    console.log(apiUrl);
    return http.post(`${apiUrl.apiUrl}/designers`, data);
}

export function getDesigner(){
    console.log('ccc');
    return http.get(`${apiUrl.apiUrl}/designers`);
}

const service = {
    addDesigner,
    getDesigner
}

export default service;