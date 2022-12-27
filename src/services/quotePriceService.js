import http from "./httpService";
import apiUrl  from '../config.json';


export function addQuotePrice(data){
    return http.post(`${apiUrl.apiUrl}/quotePrices`, data);
}

export function getQuotePrices(){
    console.log('11');
    return http.get(`${apiUrl.apiUrl}/quotePrices`);
}

export function getBigOrderNumber(){
    return http.get(`${apiUrl.apiUrl}/quotePrices/bigOrderNumber`);
}

const service = {
    addQuotePrice,
    getQuotePrices,
    getBigOrderNumber
}

export default service;