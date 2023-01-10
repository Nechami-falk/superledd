import http from "./httpService";
import apiUrl  from '../config.json';

export class CompanyService{

    static addCompany(data){
        console.log(apiUrl);
        return http.post(`${apiUrl.apiUrl}/companies`, data);
    }

    static getCompany(){
        return http.get(`${apiUrl.apiUrl}/companies`);
    }   
}



