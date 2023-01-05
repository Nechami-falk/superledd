import React, {useEffect, useState} from 'react';
import productService from '../services/productService';
import urlImg from '../config.json';

function MyProducts() {

    useEffect(() => {
        getProducts();
    
    }, []);
    

    const [products, serProducts] = useState();
const getProducts = async()=>{
try{
    let data = await productService.getProducts();
    data = data.data;
    console.log(data);
    serProducts(data);
}
catch(ex){
    console.log(ex);
}
}

  return (
    <React.Fragment>
        <div className='container col-lg-12'>
            <h1 className="text-center">המוצרים שלנו</h1>
        <div className="row">
            {products && products.map((prod)=>(
<div className="card m-3" key={prod.id} style={{width: "18rem"}}>
  <img className="card-img-top imgMyProd" src={`${urlImg.urlImg}/uploads/${prod.image}`} alt="Card cap"/>
  <div className="card-body">
    <h5 className="card-title">{prod.name}</h5>
    <p className="card-text">מחיר : {prod.price}</p>
    <p className="card-text">מחיר עלות : {prod.agentPrice}</p>
    <p className="card-text">חברה : {prod.company}</p>
    <p className="card-text"></p>
    <p className="card-text"></p>
  </div>
</div>
 ))}
</div>
</div>
    </React.Fragment>
  )
}

export default MyProducts