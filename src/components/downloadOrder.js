import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import {ProductOrderService} from '../services/productOrderService';
import lodash from 'lodash';
import urlImg from '../config.json';



function DownloadOrder() {

  const location = useLocation();
  const [order, setOrder ] = useState();
  const [products, setProducts] = useState([]);
  const [totalPayment, setTotalPayment] = useState();

  const calculationPayment = useCallback(
    (data) =>{
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
    setTimeout(() => {
      downloadPDFWithBrowserPrint();
    }, 3000);
    
    
  },[])

  const getOrderDetails = useCallback(
    async () =>{
    console.log(location.state);
    setOrder(location.state);
    let order= location.state;
    console.log(order);
    console.log(order.numberOrder);
    let data = await ProductOrderService.getOrderByNumberOrder(order.numberOrder);
    console.log(data.data);
    setProducts(data.data);
    calculationPayment(data.data);
    
  }
  ,[calculationPayment, location.state])

    useEffect( () => {
      console.log('555');
        getOrderDetails();      
      },[getOrderDetails]);

  
  
  

  function downloadPDFWithBrowserPrint() {
    window.print();
  }

  return (
    
    <React.Fragment>
      
    <div className="container" id="jsPDF">
    <h1 className="text-center h3">הצעת מחיר עבור: {order && order.customerName}</h1>
    <h5 className="text-center">תאריך: {order && order.date}     מספר הזמנה: {order && order.numberOrder}</h5>
    <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">שם המוצר</th>
        <th scope="col">צבע גוף התאורה</th>
        <th scope="col">צבע אור</th>
        <th scope="col">מיקום בבית</th>
        <th scope="col">תמונה</th>
        <th scope="col">הערות</th>
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
        <td>{prod.color}</td>
        <td>{prod.shadeLight}</td>
        <td>{prod.location}</td>
        <td style={{width:"8%"}}>
        <img style={{width:"100%"}} src={`${urlImg.urlImg}/uploads/${prod.image}.png`} alt={prod.name} /* className="card-img-top" *//>
        </td>
        <td>{prod.remarks}</td>
        <td>{prod.quantity}</td>
        <td>{prod.price}</td>
        <td>{(prod.price)*(prod.quantity)}</td>
      </tr>
      ))}
    </tbody>
  </table>
  <h3 className="text-start">סה"כ לתשלום :{parseFloat(totalPayment).toFixed(2)}</h3>
  <div>
    {/* <button className ="btn btn-info" onClick={downloadPDFWithBrowserPrint}>להדפסה/ הורדה</button> */}
 
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

export default DownloadOrder;