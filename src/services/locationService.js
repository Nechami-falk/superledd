import http from "./httpService";
import apiUrl  from '../config.json';


export class LocationService{
    static addLocation(data){
        console.log(apiUrl);
        return http.post(`${apiUrl.apiUrl}/locations`, data);
    }

    static getLocations(){
        return http.get(`${apiUrl.apiUrl}/locations`);
    }
}


