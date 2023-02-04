import React, {useEffect, useState} from 'react';
import { ProductService } from '../services/productService';
import urlImg from '../config.json';

function MyImageProducts() {


    const [products, setProducts] = useState();
    useEffect(() => {
      const getProducts = async ()=>{
        try{
        const productsData = await ProductService.getProducts();
        console.log(productsData.data);
        setProducts(productsData.data)
      }
      catch(ex){
      console.log(ex);
      }
    }

      getProducts();
    }, [])

    const onDeleteImage =  (image)=>{
       
     
    }
    
  return (
    <div className='container col-lg-12'>
        <div className='row'>
            
        {products && products.map((prod)=>(
            
            <div className='col-lg-3 m-3' style={{border:"1px solid black"}}>
                <div className="card-body m-3">
                <h4>{prod.image}</h4>
            <img className="card-img-top imgMyProd" src={`${urlImg.urlImg}/uploads/${prod.image}.png`} alt="Card cap"/>
            <button className='btn btn-danger m-5 text-center'onClick={()=>{onDeleteImage(prod.image)}}>מחיקת תמונה</button>
            </div>
            </div>
        ))}
    </div>
    
    </div>
  )
}

export default MyImageProducts