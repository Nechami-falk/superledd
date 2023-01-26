import React, {useEffect, useState} from 'react';
import {ProductService} from '../services/productService';
import urlImg from '../config.json';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


function MyProducts() {

    useEffect(() => {
      getProducts();
    }, []);
    
const navigate = useNavigate();
const [products, setProducts] = useState();
const [error, setError] = useState();
const { register } = useForm(); 

const getProducts = async()=>{
try{
    let data = await ProductService.getProducts();
    data = data.data;
    console.log(data);
    setProducts(data);
}
catch(ex){
    console.log(ex);
}
}

const onDeleteProd = async (id) =>{
  await ProductService.deleteProd(id);
  getProducts();
}

const onUpdateCurrentProd =(productId)=>{
  navigate('/editProduct', {state:productId});
}

const onSearchSubmit = async(e) =>{
  console.log(e.target.value);
  const data = e.target.value;
  try{
    const product = await ProductService.getProductSearch(data);
    console.log(product.data);
    setProducts(product.data);
    setError('');
    if(product.data.length < 1){
      console.log('hhh');
      setError('אין תוצאות');
    }
  }
  catch(ex){
    console.log(ex);
  }
}
  return (
    <React.Fragment>
        <div className='container'>
        <h1 className='text-center'>המוצרים שלנו</h1>
        <div className='row col-lg-12 m-3'>
            <form className="col-lg-4" role="search">
        <input className="form-control" type="search" placeholder="חיפוש..." aria-label="Search" onKeyUp={(e) => {onSearchSubmit(e)}} {...register("search")}/>
      </form>
      <h3 className='col-lg-8'>{error}</h3>
      </div>
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
          <button className="btn btn-warning m-2" onClick={()=>{onUpdateCurrentProd(prod._id)}}>עדכון</button>
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