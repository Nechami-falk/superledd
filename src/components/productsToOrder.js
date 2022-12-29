import React, {useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import productOrderService from '../services/productOrderService'

function ProductToOrder() {

  useEffect( () => {
    getProductByStatus();
  }, []);

  const [ productsToOrder ,setProductsToOrder] = useState([]);

  const getProductByStatus = async() => {
    try{
      let products = await productOrderService.getProductByStatus('toOrder'); 
      console.log(products);
      setProductsToOrder(products.data);
    }
    catch(ex){
      console.log(ex);
    }
  }

  const onUpdatProductOrder = async(id) =>{
    let status = 'ordered'
    try{
      await productOrderService.updateStatusToOrder(id, 'ordered');
      toast.success('המוצר הוזמן');
      getProductByStatus();
      
    }
    catch(ex){
      console.log(ex.message);
    }
  }

 const onCancelOrder = async(id)=>{
  try{
    await productOrderService.deleteProdFromOrder(id);
    getProductByStatus();
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
      <th scope="col">חברה</th>
      <th scope="col">צבע</th>
      <th scope="col">תמונה</th>
      <th scope="col">כמות</th>
      <th scope="col">מחיר</th>
      <th scope="col">סה"כ</th>
      <th scope="col">להזמין</th>
      <th scope="col">לבטל</th>
    </tr>
  </thead>
  <tbody>
  {productsToOrder && productsToOrder.map((prod, i)=>(
    <tr>
      <td>{i+1}</td>
      <td>{prod.name}</td>
      <td>{prod.numberOrder}</td>
      <td>{prod.customerName}</td>
      <td>{prod.company}</td>
      <td>{prod.color}</td>
      <td style={{width:"8%"}}><img style={{width:"100%"}} src={`https://superled-api.render.com/uploads/${prod.catalogNumber}.png`} alt={prod.name} className="card-img-top"/></td>
      <td>{prod.quantity}</td>
      <td>{prod.price}</td>
      <td>{(prod.price)*(prod.quantity)}</td>
      <td><button className="btn btn-info mt-3" onClick={()=>{onUpdatProductOrder(prod._id)}} >הוזמן</button></td>
      <td><button className="btn btn-danger mt-3" onClick={()=>onCancelOrder(prod._id)}>ביטול</button></td>
    </tr>
    ))}
  </tbody>
</table>
</div>
    </div>
    </React.Fragment>
  )
}

export default ProductToOrder;