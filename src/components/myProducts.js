import React, {useEffect, useState} from 'react';
import {ProductService} from '../services/productService';
import urlImg from '../config.json';

function MyProducts() {

    useEffect(() => {
      getProducts();
    }, []);
    

    const [products, serProducts] = useState();
const getProducts = async()=>{
try{
    let data = await ProductService.getProducts();
    data = data.data;
    console.log(data);
    serProducts(data);
}
catch(ex){
    console.log(ex);
}
}

const onDeleteProd = async (id) =>{
  await ProductService.deleteProd(id);
  getProducts();
}

  return (
    <React.Fragment>
        <div className='container col-lg-12'>
            <h1 className="text-center">המוצרים שלנו</h1>
        <div className="row">
            {products && products.map((prod)=>(
        <div className="card m-3" key={prod.id} style={{width: "18rem"}}>
          <img className="card-img-top imgMyProd" src={`${urlImg.urlImg}/uploads/${prod.image}.png`} alt="Card cap"/>
          <div className="card-body">
            <h5 className="card-title">{prod.name}</h5>
            <p className="card-text">מחיר : {prod.price}</p>
            <p className="card-text">מחיר עלות : {prod.agentPrice}</p>
            <p className="card-text">חברה : {prod.company}</p>
            <p className="card-text"></p>
            <p className="card-text"></p>
          </div>
          <div className="d-flex justify-content-around">
          <button className="btn btn-warning m-2">עדכון</button>
          <button className="btn btn-danger m-2" onClick={()=>{onDeleteProd(prod._id)}}>מחיקה</button>
          </div>
</div>
 ))}
</div>
</div>
    </React.Fragment>
  )
}

export default MyProducts