import http from "./httpService";
import apiUrl  from '../config.json';

export class QuotePriceService{

    static addQuotePrice(data){
        return http.post(`${apiUrl.apiUrl}/quotePrices`, data);
    }

    static getQuotePrices(){
        console.log('11');
        return http.get(`${apiUrl.apiUrl}/quotePrices`);
    }

    static getBigOrderNumber(){
        return http.get(`${apiUrl.apiUrl}/quotePrices/bigOrderNumber`);
    }
}

