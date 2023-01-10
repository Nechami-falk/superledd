import http from "./httpService";
import apiUrl  from '../config.json';


export class DesignerService{

    static addDesigner(data){
        console.log(apiUrl);
        return http.post(`${apiUrl.apiUrl}/designers`, data);
    }

    static getDesigner(){
        console.log('ccc');
        return http.get(`${apiUrl.apiUrl}/designers`);
    }
}
