import React, {useState, useEffect} from 'react';
import productOrderService from '../services/productOrderService';

function ProductsOrdered() {

  useEffect( () => {
    getOrderedProdeuct();
    getCurrentDate();
  }, []);

const [productsOrdered, setProductsOrdered] = useState();
const [date, setDate] = useState();

const getOrderedProdeuct = async()=>{
  try{
    let product = await productOrderService.getProductByStatus('ordered');
    console.log(product.data);
    setProductsOrdered(product.data);
  }
  catch(ex){
    console.log(ex.message);
  }
}

const onUpdateProvided = async(id)=>{
  try{
    await productOrderService.updateStatusToProduct(id, 'provided', date);
   /*  await productOrderService.updateDelivaryDate(id, date); */
    getOrderedProdeuct();
  }
  catch(ex){
    console.log(ex.message);
  }
}

const getCurrentDate = () =>{
  let curr = new Date();
  console.log(curr);
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0,10);
  setDate(date);
  console.log(date);
  }

  return (
    <React.Fragment>
    <div className="container">
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
      <td style={{width:"8%"}}><img style={{width:"100%"}} src={`https://superled-api.onrender.com/${prod.catalogNumber}.png`} alt={prod.name} className="card-img-top"/></td>
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
