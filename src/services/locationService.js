import http from "./httpService";
import apiUrl  from '../config.json';


export function addLocation(data){
    console.log(apiUrl);
    return http.post(`${apiUrl.apiUrl}/locations`, data);
}

export function getLocations(){
    return http.get(`${apiUrl.apiUrl}/locations`);
}

const service = {
    addLocation,
    getLocations
}

export default service;

