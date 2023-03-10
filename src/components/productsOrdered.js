import React, {useState, useEffect} from 'react';
import {ProductOrderService} from '../services/productOrderService';
import urlImg from '../config.json';

function ProductsOrdered() {

  useEffect( () => {
    getOrderedProdeuct();
    getCurrentDate();
  }, []);

const [productsOrdered, setProductsOrdered] = useState();
const [date, setDate] = useState();

const getOrderedProdeuct = async()=>{
  try{
    let product = await ProductOrderService.getProductByStatus('ordered');
    console.log(product.data);
    setProductsOrdered(product.data);
  }
  catch(ex){
    console.log(ex.message);
  }
}

const onUpdateProvided = async(id)=>{
  try{
    await ProductOrderService.updateStatusToProduct(id, 'provided', date);
   /*  await productOrderService.updateDelivaryDate(id, date); */
    getOrderedProdeuct();
  }
  catch(ex){
    console.log(ex.message);
  }
}

const getCurrentDate = () =>{
  let month  = new Date().getMonth();
  let year = new Date().getFullYear();
  let day = new Date().getDate();
  const newDate = `${day}/${month+1}/${year}`
  console.log(newDate,month, year, day);
  setDate(newDate);
  console.log(newDate);
  }

  const onDataSubmit = async (e)=>{
    console.log(e.target.value);
    try{
      let data = await ProductOrderService.getProductStatusBySearch(e.target.value, 'ordered' );
      console.log(data);
      setProductsOrdered(data.data);
    }
    catch(ex){
      console.log(ex);
    }
   }
  

  return (
    <React.Fragment>
    <div className="container">
    <div className='row col-lg-12 m-3'>
      <form className="col-lg-4" role="search">
        <input className="form-control me-2" type="search" placeholder="חיפוש..." aria-label="Search"  onKeyUp={(e) => {onDataSubmit(e)}}/>
      </form>
      </div>
    <div className="container">
  <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th></th>
      <th scope="col">שם המוצר</th>
      <th scope="col">מספר הזמנה</th>
      <th scope="col">שם הלקוח</th>
      <th scope="col">חברה</th>
      <th scope="col">צבע</th>
      <th scope="col">תמונה</th>
      <th scope="col">הערות</th>
      <th scope="col">כמות</th>
      <th scope="col">מחיר</th>
      <th scope="col">סה"כ</th>
      <th scope="col">סופק ללקוח</th>
      
    </tr>
  </thead>
  <tbody>
  {productsOrdered && productsOrdered.map((prod, i)=>(
    <tr>
      <td>{i+1}</td>
      <td>{prod.name}</td>
      <td>{prod.numberOrder}</td>
      <td>{prod.customerName}</td>
      <td>{prod.company}</td>
      <td>{prod.color}</td>
      <td style={{width:"8%"}}><img style={{width:"100%"}} src={`${urlImg.urlImg}/uploads/${prod.image}.png`} alt={prod.name} className="card-img-top"/></td>
      <td>{prod.remarks}</td>
      <td>{prod.quantity}</td>
      <td>{prod.price}</td>
      <td>{(prod.price)*(prod.quantity)}</td>
      <td><button className="btn btn-success mt-3" onClick={()=>{onUpdateProvided(prod._id)}}>סופק ללקוח</button></td>
    </tr>
    ))}
  </tbody>
</table>
</div>
    </div>
    </React.Fragment>
  )
}

export default ProductsOrdered;
