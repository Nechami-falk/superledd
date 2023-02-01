import React, {useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {CompanyService} from '../services/companyService';
import {ProductOrderService} from '../services/productOrderService';
import urlImg from '../config.json';

function ProductToOrder() {

  useEffect( () => {
    getProductByStatus();
    getCompanies();
  }, []);

  const [ productsToOrder ,setProductsToOrder] = useState([]);
  const [companies, setCompanies] = useState();

  const getProductByStatus = async() => {
    try{
      let products = await ProductOrderService.getProductByStatus('toOrder'); 
      console.log(products);
      setProductsToOrder(products.data);
    }
    catch(ex){
      console.log(ex);
    }
  }

  const getCompanies = async()=>{
    try{
    let data = await CompanyService.getCompany();
    console.log(data);
    setCompanies(data.data);
    }
    catch(ex){
    console.log(ex);
    }
      }

  const onUpdatProductOrder = async(id) =>{
    try{
      await ProductOrderService.updateStatusToProduct(id, 'ordered');
      toast.success('המוצר הוזמן');
      getProductByStatus();
      
    }
    catch(ex){
      console.log(ex.message);
    }
  }

 const onCancelOrder = async(id)=>{
  try{
    await ProductOrderService.deleteProdFromOrder(id);
    getProductByStatus();
  }
  catch(ex){
    console.log(ex.message);
  }
 }
  
 const onDataSubmit = async (e)=>{
  console.log(e.target.value);
  try{
    let data = await ProductOrderService.getProductStatusBySearch(e.target.value, 'toOrder' );
    console.log(data);
    setProductsToOrder(data.data);
  }
  catch(ex){
    console.log(ex);
  }
 }

  return (
    <React.Fragment>
      <div className='container'>
      <h1 className='text-center'>מוצרים להזמנה</h1>

  {/*     <div className="input-group mb-3">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">מיין לפי חברה</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" onChange={onChangeCompany}>
    {companies && companies.map((company)=>(
      <option key={company._id} value={company.companyName}>{company.companyName}</option>
    ))}
  </select>
</div> */}

<div className='row col-lg-12 m-3'>
      <form className="col-lg-4" role="search">
        <input className="form-control me-2" type="search" placeholder="חיפוש..." aria-label="Search"  onKeyUp={(e) => {onDataSubmit(e)}}/>
      </form>
   {/*    <h3 className='col-lg-8'>{error}</h3> */}
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
      <td style={{width:"8%"}}><img style={{width:"100%"}} src={`${urlImg.urlImg}/data/uploads/${prod.image}.png`} alt={prod.name} className="card-img-top"/></td>
      <td>{prod.remarks}</td>
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