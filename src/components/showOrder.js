import React, { useEffect, useState} from 'react';
import lodash from 'lodash';
import{useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import productOrderService from '../services/productOrderService';
import PDFFile from './PDFFile';
/* import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; */
import { useNavigate } from "react-router-dom";



function ShowOrder() {

  useEffect( () => {
    getOrderDetails();
    /* calculationPayment(products); */
    console.log('useEffect');
  },[]);

  const statuses = [{value:'ordered', name:'הוזמן'}, 
                    {value:'toOrder', name:'להזמנה'},
                    {value:'inStock',name:'במלאי'},
                    {value:'provided',name:'סופק ללקוח'},
                    {value:'offerPrice', name:'הצעת מחיר'}];

  let location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder ] = useState();
  const [products, setProducts] = useState([]);
  const [totalPayment, setTotalPayment] = useState();
  const [isShown, setIsShown] = useState(false);
  const [status, setStatus] = useState();


  const getOrderDetails = async () =>{
    console.log(location.state);
    setOrder(location.state);
    let order= location.state;
    console.log(order);
    console.log(order.numberOrder);
    let data = await productOrderService.getOrderByNumberOrder(order.numberOrder);
    console.log(data.data);
    setProducts(data.data);
    calculationPayment(data.data)
  }

/*   const onProductToOrder = async(id) => {
    console.log('2222');
    let status = "toOrder";
    try{
      await productOrderService.updateStatusToProduct(id, status);
      toast.success('המוצר עודכן להזמנה');
      getOrderDetails();
      }
      catch(ex){
        console.log(ex.message);
      }
  } */

  const onProductToOrder = ()=>{
    setIsShown(current => !current);
  };

  const onToCancel = async(id)=>{
    console.log(id);
    let productId = id;
    try{
      await productOrderService.deleteProdFromOrder(productId);
      toast.success('המוצר נמחק מההזמנה!');
      getOrderDetails();
    }
    catch(ex){
      console.log(ex.message);
    }
  }

  const calculationPayment = (data) =>{

    console.log('rrrr');
    console.log(data);
    const newArray = [];
    newArray.push(data.map(p=> p.price* p.quantity));
    console.log(newArray);
    const result = newArray.reduce((accumulator,current) => {
    console.log(accumulator);
    console.log(current);
    return accumulator + current;
    });
    let sum = lodash.sum(result);
    console.log(sum);
    setTotalPayment(sum);
  }

  function downloadPDFWithBrowserPrint() {
    window.print();
  }
  
 /*  function calculatToPay(num1, num2){
    return num1*num2
  } */
 /*  let a= [];
  var body = [];
  let n =[];
  function generatePdf() {
    var head = [['name', 'company', 'imag', 'price']]

    products && products.forEach(element => {
      
      a.push(element);
      console.log(a);
  });
    
    a.forEach(e=>{
     let n = Object.values(e);
     console.log(n);
     body.push(n);
     console.log(body);
    });
    
    
    var doc = new jsPDF()
    doc.autoTable({ head: head, body: body })
    doc.output('dataurlnewwindow')
  } */

  const onAddProduct = async()=>{
    console.log('lll');
    navigate('/addProductQuote', {state:order});
  }

  const onChangeStatus=async(event,id)=>{
    const productId = id;
    const status = event.target.value;
    setIsShown(current => !current);
    try{
      await productOrderService.updateStatusToProduct(productId, status)
      getOrderDetails();
    }
    catch(ex){
      console.log(ex);
    }
  
  }  

 
  return (
    <React.Fragment>
      
  <div className="container">
  <h1 className="text-center h3">הצעת מחיר עבור: {order && order.customerName}</h1>
  <h5 className="text-center">תאריך: {order && order.date}     מספר הזמנה: {order && order.numberOrder}</h5>
  <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">שם המוצר</th>
      <th scope="col">צבע</th>
      <th scope="col">צבע אור</th>
      <th scope="col">מיקום בבית</th>
      <th scope="col">תמונה</th>
      <th scope="col">כמות</th>
      <th scope="col">מחיר</th>
      <th scope="col">סה"כ</th>
      <th scope="col">סטטוס</th>
    </tr>
  </thead>
  <tbody>
  {products && products.map((prod, i)=>(
    <tr>
      <td>{i+1}</td>
      <td>{prod.name}</td>
      <td>{prod.color}</td>
      <td>{prod.shadeLight}</td>
      <td>{prod.location}</td>
      <td style={{width:"8%"}}>
      <img style={{width:"100%"}} src={`https:superled-api.onrender.com/uploads/${prod.name}.png`} alt={prod.name} /* className="card-img-top" *//>
      </td>
      <td>{prod.quantity}</td>
      <td>{prod.price}</td>
      <td>{parseFloat((prod.price)*(prod.quantity)).toFixed(2)}</td>
      <td>
      {prod.status && prod.status==='ordered' ? 'הוזמן' 
      :prod.status && prod.status==='toOrder' ? 'להזמנה'
      :prod.status && prod.status==='inStock' ? 'במלאי'
      :prod.status && prod.status==='offerPrice' ? 'הצעת מחיר'
      :prod.status && prod.status==='provided' ? 'סופק' : ''}
      </td>

      <td><button type="button" className="btn btn-info mt-3" onClick={()=>{onProductToOrder(prod._id)}}>עדכון סטטוס</button>
      {isShown && 
      <select className="form-select text-end"  name="company" onChange={(e)=>{onChangeStatus(e, prod._id)}}>
      <option>בחר סטטוס</option>
      {statuses && statuses.map((stat,i) => (
      <option className="option-form" value={stat.value} key={i}>{stat.name}</option>
      ))};
      </select>
      }
      </td>
      <td><button type="button" className="btn btn-danger mt-3" onClick={()=>{onToCancel(prod._id)}}>ביטול</button></td>  
      <td><button type="button" className="btn btn-warning mt-3" onClick={()=>{navigate('/editProduct',{state:prod._id})}}>עדכון מוצר</button></td>
    </tr>
    ))}
  </tbody>
</table>
<h3 className="text-start">סה"כ לתשלום :{parseFloat(totalPayment).toFixed(2)}</h3>
<div className='d-flex justify-content-center'>
<button type="button" className='btn btn-warning' onClick={onAddProduct}>הוספת מוצרים להזמנה</button>
</div>
<div>
  <button type="button" className='btn btn-info' onClick={downloadPDFWithBrowserPrint}>להדפסה</button>
  <button type="button" className='btn btn-success m-2' onClick={()=>{navigate('/downloadOrder', {state:order})}}>להורדת הצעת מחיר</button>
  {/* <button onClick={generatePdf}>הורדה</button> */}
 {/* <PDFDownloadLink document={<PDFFile products={products} order={order}/>} fileName="FORM">
      {({loading})=>
       (loading ? (
        <button>Loading Document...</button>
      ) : (
        <button className='btn btn-success'>הורדת ההצעת מחיר</button>
     )
      )}
     </PDFDownloadLink>   */}
</div>
</div>
    </React.Fragment>
  )
}

export default ShowOrder;