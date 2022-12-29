import React, {useState, useEffect} from 'react';
import productOrderService from '../services/productOrderService';

function DeliveredOrders() {

useEffect( () => {
  getProductDeliver();
},[])

const [productsDeliver, setProductsDeliver] = useState();

const getProductDeliver = async () =>{
  try{
  let products = await productOrderService.getProductByStatus('provided');
  setProductsDeliver(products.data)
}
catch(ex){
  console.log(ex.message);
}
}

const onDeleteFromProd = async(id)=>{
  try{
    await productOrderService.deleteProdFromOrder(id);
    getProductDeliver();
  }
  catch(ex){
    console.log(ex.message);
  }
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
      <th scope="col">תאריך אספקה</th>
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
  {productsDeliver && productsDeliver.map((prod, i)=>(
    <tr>
      <td>{i+1}</td>
      <td>{prod.name}</td>
      <td>{prod.numberOrder}</td>
      <td>{prod.customerName}</td>
      <td>{prod.deliveryDate}</td>
      <td>{prod.company}</td>
      <td>{prod.color}</td>
      <td style={{width:"8%"}}><img style={{width:"100%"}} src={`https://superled-api.render.com/uploads/${prod.catalogNumber}.png`} alt={prod.name} className="card-img-top"/></td>
      <td>{prod.quantity}</td>
      <td>{prod.price}</td>
      <td>{(prod.price)*(prod.quantity)}</td>
      <td><button className="btn btn-danger mt-3" onClick={()=>{onDeleteFromProd(prod._id)}}>מחיקה</button></td>
    </tr>
    ))}
  </tbody>
</table>
</div>
    </div>
    </React.Fragment>
  )
}

export default DeliveredOrders