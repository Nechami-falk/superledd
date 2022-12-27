import http from "./httpService";
import apiUrl  from '../config.json';



export function addProduct(formData, config){
    return http.post(`${apiUrl.apiUrl}/products`, formData, config);
}

export function getProducts(){
    return http.get(`${apiUrl.apiUrl}/products`);
}

export function getCatalogNumber(){
    return http.get(`${apiUrl.apiUrl}/products/catalogNumber`);
}


/* export function getBigOrderNumber(){
    return http.get(`${apiUrl.apiUrl}/products/bigOrderNumber`);
} */

export function getProduct(productId){
    return http.get(`${apiUrl.apiUrl}/products/${productId}`);
}

export function getProductByName(productName){
    console.log('yyy',productName);
    return http.get(`${apiUrl.apiUrl}/products/name/${productName}`);
}

/* export function getProductCtalogNumber(catalogNumber){
    console.log('yyy',catalogNumber);
    return http.get(`${apiUrl.apiUrl}/products/number/${catalogNumber}`);
} */

export function getOrderProducts(numberOrder){
    return http.get(`${apiUrl.apiUrl}/products/?numberOrder=${numberOrder}`, );
}



const service = {
    addProduct,
    getProducts,
    /* getBigOrderNumber, */
    getCatalogNumber,
    getProduct,
    getOrderProducts,
    getProductByName,
   
}

export default service;