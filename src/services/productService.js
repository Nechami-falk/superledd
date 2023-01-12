import http from "./httpService";
import apiUrl  from '../config.json';


export class ProductService{

    static addProduct(formData, config){
    return http.post(`${apiUrl.apiUrl}/products`, formData, config);
}

    static getProducts(){
    return http.get(`${apiUrl.apiUrl}/products`);
}

    static addImage(formData, config){
        console.log('bbb');
    return http.post(`${apiUrl.apiUrl}/products/image`, formData, config);
}

    static getCatalogNumber(){
        console.log('catalogNumber');
        return http.get(`${apiUrl.apiUrl}/products/catalogNumber`);
    }

    static getProduct(productId){
        return http.get(`${apiUrl.apiUrl}/products/${productId}`);
    }

    static getProductByName(productName){
        console.log('yyy',Date.now());
        return http.get(`${apiUrl.apiUrl}/products/name/${productName}`);
    }

    static getOrderProducts(numberOrder){
        return http.get(`${apiUrl.apiUrl}/products/?numberOrder=${numberOrder}`, );
    }

    static deleteProd(id){
        return http.delete(`${apiUrl.apiUrl}/products/${id}`);
    }
}
