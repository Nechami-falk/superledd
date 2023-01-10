import http from "./httpService";
import apiUrl  from '../config.json';

export class CategoryService{

    static addCategory(data){
        console.log(apiUrl);
        return http.post(`${apiUrl.apiUrl}/categories`, data);
    }

    static getCategory(){
        return http.get(`${apiUrl.apiUrl}/categories`);
    }
}

