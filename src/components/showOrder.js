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

  let location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder ] = useState();
  const [products, setProducts] = useState([]);
  const [totalPayment, setTotalPayment] = useState();

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

  const onProductToOrder = async(id) => {
    console.log('2222');
    let status = "toOrder";
    try{
      await productOrderService.updateStatusToOrder(id, status);
      toast.success('המוצר עודכן להזמנה');
      /* setTimeout(getReload, 3000); */
      getOrderDetails();
      }
      catch(ex){
        console.log(ex.message);
      }
  }

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
      <th scope="col">חברה</th>
      <th scope="col">צבע</th>
      <th scope="col">תמונה</th>
      <th scope="col">כמות</th>
      <th scope="col">מחיר</th>
      <th scope="col">סה"כ</th>
    </tr>
  </thead>
  <tbody>
  {products && products.map((prod, i)=>(
    <tr>
      <td>{i+1}</td>
      <td>{prod.name}</td>
      <td>{prod.company}</td>
      <td>{prod.color}</td>
      <td style={{width:"8%"}}>
      <img style={{width:"100%"}} src={`http://localhost:8182/uploads/${prod.catalogNumber}.png`} alt={prod.name} /* className="card-img-top" *//>
      </td>
      <td>{prod.quantity}</td>
      <td>{prod.price}</td>
      <td>{(prod.price)*(prod.quantity)}</td>
      <td><button type="button" className="btn btn-info mt-3" onClick={()=>{onProductToOrder(prod._id)}}>להזמין</button></td>
      <td><button type="button" className="btn btn-danger mt-3" onClick={()=>{onToCancel(prod._id)}}>לבטל</button></td>  
    </tr>
    ))}
  </tbody>
</table>
<h3 className="text-start">סה"כ לתשלום :{totalPayment}</h3>
<div>
  <button className='btn btn-info' onClick={downloadPDFWithBrowserPrint}>להדפסה</button>
  <button className='btn btn-success m-2' onClick={()=>navigate('/downloadOrder', {state:order})}>להורדת הצעת מחיר</button>
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